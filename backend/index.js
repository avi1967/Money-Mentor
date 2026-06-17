import express from "express";
import cors from "cors";
import multer from "multer";
import Papa from "papaparse";
import XLSX from "xlsx";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const INR = (n) => Number((n || 0).toFixed(2));

function sipFutureValue(monthlySip, annualReturn, months) {
  const r = annualReturn / 12;
  if (r === 0) return monthlySip * months;
  return monthlySip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

function xirr(cashflows, guess = 0.1) {
  if (!cashflows.length) return 0;
  const dates = cashflows.map((cf) => new Date(cf.date));
  const values = cashflows.map((cf) => cf.amount);
  const firstDate = dates[0];
  const days = dates.map((d) => (d - firstDate) / (1000 * 60 * 60 * 24));

  let rate = guess;
  for (let i = 0; i < 100; i += 1) {
    let f = 0;
    let df = 0;
    for (let j = 0; j < values.length; j += 1) {
      const frac = days[j] / 365;
      const denom = Math.pow(1 + rate, frac);
      f += values[j] / denom;
      df += (-frac * values[j]) / (denom * (1 + rate));
    }
    if (Math.abs(df) < 1e-10) break;
    const newRate = rate - f / df;
    if (!Number.isFinite(newRate)) break;
    if (Math.abs(newRate - rate) < 1e-7) {
      rate = newRate;
      break;
    }
    rate = Math.max(-0.99, newRate);
  }
  return rate;
}

function computeFirePlan(input) {
  const {
    age,
    retirementAge,
    annualIncome,
    annualExpenses,
    existingInvestments,
    ppf,
    desiredMonthlyExpenseAtRetirement,
    inflation = 0.06,
    preRetirementReturn = 0.12,
    postRetirementReturn = 0.07
  } = input;

  const months = Math.max(12, (retirementAge - age) * 12);
  const currentCorpus = existingInvestments + ppf;
  const monthlyNeededFuture =
    desiredMonthlyExpenseAtRetirement * Math.pow(1 + inflation, retirementAge - age);
  const annualNeededFuture = monthlyNeededFuture * 12;
  const corpusNeeded = annualNeededFuture / Math.max(0.01, postRetirementReturn - inflation);

  const grownCurrent = currentCorpus * Math.pow(1 + preRetirementReturn / 12, months);
  const gap = Math.max(0, corpusNeeded - grownCurrent);
  const neededSip = gap > 0 ? gap / (((Math.pow(1 + preRetirementReturn / 12, months) - 1) / (preRetirementReturn / 12)) * (1 + preRetirementReturn / 12)) : 0;

  const roadmap = [];
  for (let i = 1; i <= months; i += 1) {
    const yearFromNow = i / 12;
    const equityShare = Math.max(0.45, 0.8 - yearFromNow * 0.02);
    const debtShare = 1 - equityShare;
    roadmap.push({
      month: i,
      sipTotal: INR(neededSip),
      sipEquity: INR(neededSip * equityShare),
      sipDebt: INR(neededSip * debtShare),
      targetAllocation: {
        equity: INR(equityShare * 100),
        debt: INR(debtShare * 100)
      }
    });
  }

  const lifeCoverNeeded = Math.max(annualExpenses * 15, annualIncome * 12);
  const healthCoverNeeded = 1000000;
  const emergencyFund = annualExpenses / 2;
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + months);

  return {
    targetCorpus: INR(corpusNeeded),
    projectedRetirementMonthlyExpense: INR(monthlyNeededFuture),
    requiredMonthlySip: INR(neededSip),
    emergencyFundTarget: INR(emergencyFund),
    insuranceGaps: {
      recommendedLifeCover: INR(lifeCoverNeeded),
      recommendedHealthCover: INR(healthCoverNeeded)
    },
    estimatedRetirementDate: targetDate.toISOString().slice(0, 10),
    roadmap
  };
}

function computeMoneyHealthScore(input) {
  const {
    monthlyExpenses,
    emergencyFund,
    lifeInsuranceCover,
    healthInsuranceCover,
    debtToIncomeRatio,
    equityPct,
    debtPct,
    taxSavedPotential,
    retirementCorpusProgress
  } = input;

  const emergencyScore = Math.min(100, (emergencyFund / Math.max(1, monthlyExpenses * 6)) * 100);
  const insuranceScore = Math.min(100, ((lifeInsuranceCover / 10000000) * 50) + ((healthInsuranceCover / 1000000) * 50));
  const diversificationScore = Math.min(100, 100 - Math.abs(equityPct - 65) - Math.abs(debtPct - 35));
  const debtScore = Math.max(0, 100 - debtToIncomeRatio * 120);
  const taxScore = Math.min(100, (taxSavedPotential / 200000) * 100);
  const retirementScore = Math.min(100, retirementCorpusProgress);

  const dimensions = {
    emergencyPreparedness: INR(emergencyScore),
    insuranceCoverage: INR(insuranceScore),
    investmentDiversification: INR(diversificationScore),
    debtHealth: INR(debtScore),
    taxEfficiency: INR(taxScore),
    retirementReadiness: INR(retirementScore)
  };
  const total = INR(Object.values(dimensions).reduce((a, b) => a + b, 0) / 6);
  return { total, dimensions };
}

function computeTax(input) {
  const {
    baseSalary,
    hra,
    deduction80C,
    nps80ccd1b,
    homeLoanInterest,
    otherDeductions = 0
  } = input;

  const gross = baseSalary + hra;
  const standardDeduction = 50000;
  const taxableOld = Math.max(0, gross - standardDeduction - deduction80C - nps80ccd1b - homeLoanInterest - otherDeductions);
  const taxableNew = Math.max(0, gross - 75000);

  const slabTaxOld = (income) => {
    let tax = 0;
    if (income > 250000) tax += Math.min(income - 250000, 250000) * 0.05;
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.2;
    if (income > 1000000) tax += (income - 1000000) * 0.3;
    return tax * 1.04;
  };

  const slabTaxNew = (income) => {
    const slabs = [
      [400000, 0.05],
      [400000, 0.1],
      [400000, 0.15],
      [400000, 0.2],
      [400000, 0.25],
      [Infinity, 0.3]
    ];
    let tax = 0;
    let remaining = income;
    for (const [limit, rate] of slabs) {
      if (remaining <= 0) break;
      const used = Math.min(remaining, limit);
      tax += used * rate;
      remaining -= used;
    }
    return tax * 1.04;
  };

  const oldTax = slabTaxOld(taxableOld);
  const newTax = slabTaxNew(taxableNew);
  const best = oldTax < newTax ? "Old Regime" : "New Regime";
  const missed = [];
  if (deduction80C < 150000) missed.push("80C not fully utilized.");
  if (nps80ccd1b < 50000) missed.push("NPS 80CCD(1B) can add up to ₹50,000.");
  if (homeLoanInterest < 200000) missed.push("Home loan interest cap under 24(b) may have unused room.");

  return {
    grossIncome: INR(gross),
    oldRegime: {
      taxableIncome: INR(taxableOld),
      tax: INR(oldTax)
    },
    newRegime: {
      taxableIncome: INR(taxableNew),
      tax: INR(newTax)
    },
    optimalRegime: best,
    savingsVsOtherRegime: INR(Math.abs(oldTax - newTax)),
    missedDeductions: missed,
    additionalInstruments: [
      { name: "ELSS", liquidity: "3-year lock-in", risk: "Moderate-High" },
      { name: "PPF", liquidity: "Low", risk: "Low" },
      { name: "Tax Saver FD", liquidity: "5-year lock-in", risk: "Low" }
    ]
  };
}

function computeLifeEvent(input) {
  const { eventType, amount, risk = "moderate" } = input;
  const rules = {
    bonus: { emergency: 0.3, debt: 0.25, invest: 0.45 },
    inheritance: { emergency: 0.2, debt: 0.3, invest: 0.5 },
    marriage: { emergency: 0.25, debt: 0.25, invest: 0.5 },
    baby: { emergency: 0.35, debt: 0.15, invest: 0.5 }
  };
  const base = rules[eventType] || rules.bonus;
  const riskBoost = risk === "aggressive" ? 0.1 : risk === "conservative" ? -0.1 : 0;
  const invest = Math.min(0.7, Math.max(0.2, base.invest + riskBoost));
  const emergency = base.emergency;
  const debt = Math.max(0.05, 1 - invest - emergency);
  return {
    allocation: {
      emergencyFund: INR(amount * emergency),
      debtPrepayment: INR(amount * debt),
      investment: INR(amount * invest)
    },
    advice: [
      "Prioritize emergency buffer before market deployment.",
      "Avoid redeeming equity before 1 year to reduce STCG tax.",
      "Automate new SIP amount within 3 business days."
    ]
  };
}

function computeCouplePlan(input) {
  const { partnerA, partnerB, sharedGoalsAmount } = input;
  const totalIncome = partnerA.income + partnerB.income;
  const splitA = partnerA.income / totalIncome;
  const splitB = partnerB.income / totalIncome;

  return {
    combinedNetWorth: INR(partnerA.netWorth + partnerB.netWorth),
    goalSipSplit: {
      partnerA: INR(sharedGoalsAmount * splitA),
      partnerB: INR(sharedGoalsAmount * splitB)
    },
    taxTips: [
      "Assign HRA claim to partner with rented-city posting and higher marginal tax rate.",
      "Use separate NPS Tier-I accounts to claim up to ₹50,000 each.",
      "Take family floater cover if both have no major pre-existing conditions."
    ]
  };
}

function parseRows(file) {
  const name = file.originalname.toLowerCase();
  if (name.endsWith(".csv")) {
    const txt = file.buffer.toString("utf-8");
    const parsed = Papa.parse(txt, { header: true, skipEmptyLines: true });
    return parsed.data;
  }
  const wb = XLSX.read(file.buffer, { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(ws);
}

function computePortfolio(rows) {
  const normalized = rows.map((r) => ({
    fund: r.fund || r.Fund || r.scheme || "Unknown Fund",
    date: r.date || r.Date || new Date().toISOString().slice(0, 10),
    amount: Number(r.amount || r.Amount || 0),
    currentValue: Number(r.currentValue || r.CurrentValue || 0),
    amc: r.amc || r.AMC || "Unknown AMC",
    expenseRatio: Number(r.expenseRatio || r.ExpenseRatio || 1.2),
    holdings: String(r.holdings || r.Holdings || "")
  }));

  const totalCurrent = normalized.reduce((a, b) => a + b.currentValue, 0);
  const cashflows = normalized.map((x) => ({ date: x.date, amount: -Math.abs(x.amount) }));
  cashflows.push({ date: new Date().toISOString().slice(0, 10), amount: totalCurrent });
  const portfolioXirr = xirr(cashflows) * 100;

  const stockMap = {};
  normalized.forEach((f) => {
    f.holdings.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => {
      stockMap[s] = (stockMap[s] || 0) + (f.currentValue / Math.max(1, totalCurrent)) * 100;
    });
  });

  const overlap = Object.entries(stockMap)
    .filter(([, pct]) => pct > 20)
    .map(([stock, pct]) => ({ stock, overlapPct: INR(pct) }))
    .sort((a, b) => b.overlapPct - a.overlapPct);

  const avgExpense = normalized.reduce((a, b) => a + b.expenseRatio, 0) / Math.max(1, normalized.length);
  const directPlanExpense = Math.max(0.3, avgExpense - 0.55);

  return {
    funds: normalized.length,
    amcs: new Set(normalized.map((x) => x.amc)).size,
    totalCurrentValue: INR(totalCurrent),
    xirr: INR(portfolioXirr),
    overlap,
    expenseDrag: {
      currentAvgExpenseRatio: INR(avgExpense),
      estimatedDirectPlanExpenseRatio: INR(directPlanExpense),
      annualCostDifference: INR((avgExpense - directPlanExpense) * 0.01 * totalCurrent)
    },
    rebalancePlan: [
      "Pause SIP in top overlapping large-cap fund for 3 months.",
      "Redirect 40% of paused SIP to flexi-cap index direct fund.",
      "Redeem only lots older than 12 months first to avoid STCG."
    ]
  };
}

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.post("/api/fire-plan", (req, res) => {
  res.json(computeFirePlan(req.body));
});

app.post("/api/money-health-score", (req, res) => {
  res.json(computeMoneyHealthScore(req.body));
});

app.post("/api/tax-wizard", (req, res) => {
  res.json(computeTax(req.body));
});

app.post("/api/life-event", (req, res) => {
  res.json(computeLifeEvent(req.body));
});

app.post("/api/couple-plan", (req, res) => {
  res.json(computeCouplePlan(req.body));
});

app.post("/api/mf-xray", upload.single("statement"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File is required." });
  const rows = parseRows(req.file);
  res.json(computePortfolio(rows));
});

app.listen(PORT, () => {
  console.log(`AI Money Mentor backend running on http://localhost:${PORT}`);
});
