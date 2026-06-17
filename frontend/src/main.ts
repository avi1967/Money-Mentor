import "./style.css";

const apiBase = window.location.port.startsWith("517") ? "http://localhost:8080/api" : "/api";
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="mobile-nav">
    <div class="sidebar-brand">
      <div class="brand-icon">₹</div>
      <div class="brand-name">AI Money Mentor</div>
    </div>
    <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
  </div>

  <div class="dashboard-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">₹</div>
        <div class="brand-name">AI Money Mentor</div>
      </div>
      <nav style="flex-grow: 1;">
        <ul class="sidebar-menu">
          <li class="menu-item active" data-tab="overview">
            <button><span class="menu-icon">📊</span> Overview</button>
          </li>
          <li class="menu-item" data-tab="fire">
            <button><span class="menu-icon">🔥</span> FIRE Path Planner</button>
          </li>
          <li class="menu-item" data-tab="health">
            <button><span class="menu-icon">🩺</span> Money Health Score</button>
          </li>
          <li class="menu-item" data-tab="tax">
            <button><span class="menu-icon">🧙‍♂️</span> Tax Wizard</button>
          </li>
          <li class="menu-item" data-tab="life-event">
            <button><span class="menu-icon">📅</span> Life Event Advisor</button>
          </li>
          <li class="menu-item" data-tab="couple">
            <button><span class="menu-icon">👥</span> Couple's Planner</button>
          </li>
          <li class="menu-item" data-tab="mf-xray">
            <button><span class="menu-icon">⚡</span> MF X-Ray</button>
          </li>
          <li class="menu-item" data-tab="nudges">
            <button><span class="menu-icon">💡</span> Nudge Engine</button>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        AI Money Mentor v1.2<br>India Personal Finance
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="main-content">
      
      <!-- Tab: Dashboard Overview -->
      <section id="tab-overview" class="tab-view active">
        <h1>Dashboard Overview</h1>
        <p class="subtitle">Unified dashboard summarizing your overall money health and actionable items.</p>
        
        <div class="dashboard-grid">
          <div class="card">
            <h2>Financial Wellness Snapshot</h2>
            <div id="overviewHealthDial">
              <div class="health-score-container" style="padding: 20px 0;">
                <p class="muted" style="text-align: center;">Run the <strong>Money Health Score</strong> tool in the sidebar to generate your wellness dial.</p>
              </div>
            </div>
            
            <div class="quick-stats">
              <div class="stat-widget" id="widget-fire-card">
                <span>FIRE Corpus Target</span>
                <strong id="widget-fire-val">Not Computed</strong>
              </div>
              <div class="stat-widget" id="widget-tax-card">
                <span>Optimal Tax Regime</span>
                <strong id="widget-tax-val">Not Computed</strong>
              </div>
            </div>
          </div>
          
          <div class="card">
            <h2>Dynamic Actionable Nudges</h2>
            <div id="overviewNudges">
              <div class="nudges-deck">
                <div class="nudge-card">
                  <p style="margin: 0; color: var(--text-secondary);">Click below or load the Nudge Engine to pull custom financial advice.</p>
                </div>
              </div>
            </div>
            <button id="overviewNudgeBtn" class="primary-btn">Generate This Month's Nudges</button>
          </div>
        </div>
      </section>

      <!-- Tab: FIRE Path Planner -->
      <section id="tab-fire" class="tab-view">
        <h1>FIRE Path Planner</h1>
        <p class="subtitle">Plan your early retirement using custom dynamic asset allocations and SIP roadmaps.</p>
        
        <div class="card">
          <h2><span class="menu-icon">🔥</span> Retirement Parameters</h2>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="age">Current Age</label>
              <input id="age" type="number" placeholder="Age" value="34"/>
            </div>
            <div class="input-group">
              <label for="retirementAge">Desired Retirement Age</label>
              <input id="retirementAge" type="number" placeholder="Retirement Age" value="50"/>
            </div>
            <div class="input-group">
              <label for="income">Annual Income (₹)</label>
              <input id="income" type="number" placeholder="Annual Income" value="2400000"/>
            </div>
            <div class="input-group">
              <label for="expenses">Annual Expenses (₹)</label>
              <input id="expenses" type="number" placeholder="Annual Expenses" value="900000"/>
            </div>
            <div class="input-group">
              <label for="investments">Existing Mutual Funds (₹)</label>
              <input id="investments" type="number" placeholder="Existing MF Investments" value="1800000"/>
            </div>
            <div class="input-group">
              <label for="ppf">Existing PPF Balance (₹)</label>
              <input id="ppf" type="number" placeholder="PPF" value="600000"/>
            </div>
            <div class="input-group">
              <label for="retireExpense">Monthly retirement draw (today's value, ₹)</label>
              <input id="retireExpense" type="number" placeholder="Monthly retirement draw" value="150000"/>
            </div>
          </div>
          <button id="fireBtn" class="primary-btn">Recalculate FIRE Plan</button>
          <div id="fireOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Money Health Score -->
      <section id="tab-health" class="tab-view">
        <h1>Money Health Score</h1>
        <p class="subtitle">Assess your holistic financial health across emergency buffer, debt, tax and insurance.</p>
        
        <div class="card">
          <h2><span class="menu-icon">🩺</span> Health Inputs</h2>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="mMonthlyExp">Monthly expenses (₹)</label>
              <input id="mMonthlyExp" type="number" placeholder="Monthly expenses" value="75000"/>
            </div>
            <div class="input-group">
              <label for="mEmergency">Emergency fund corpus (₹)</label>
              <input id="mEmergency" type="number" placeholder="Emergency fund corpus" value="300000"/>
            </div>
            <div class="input-group">
              <label for="mLife">Life Insurance Cover (₹)</label>
              <input id="mLife" type="number" placeholder="Life cover" value="10000000"/>
            </div>
            <div class="input-group">
              <label for="mHealth">Health Insurance Cover (₹)</label>
              <input id="mHealth" type="number" placeholder="Health cover" value="1000000"/>
            </div>
            <div class="input-group">
              <label for="mDebtRatio">Debt to Income ratio (e.g. 0.18)</label>
              <input id="mDebtRatio" type="number" step="0.01" placeholder="Debt/income ratio" value="0.18"/>
            </div>
            <div class="input-group">
              <label for="mEq">Current Equity Allocation %</label>
              <input id="mEq" type="number" placeholder="Equity %" value="70"/>
            </div>
            <div class="input-group">
              <label for="mDebt">Current Debt Allocation %</label>
              <input id="mDebt" type="number" placeholder="Debt %" value="30"/>
            </div>
            <div class="input-group">
              <label for="mTaxSave">Unused Section 80C/NPS (₹)</label>
              <input id="mTaxSave" type="number" placeholder="Tax saved potential" value="125000"/>
            </div>
            <div class="input-group">
              <label for="mRetire">Retirement Target Completion %</label>
              <input id="mRetire" type="number" placeholder="Retirement progress %" value="48"/>
            </div>
          </div>
          <button id="healthBtn" class="primary-btn">Compute Health Score</button>
          <div id="healthOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Tax Wizard -->
      <section id="tab-tax" class="tab-view">
        <h1>Tax Wizard</h1>
        <p class="subtitle">Detailed side-by-side simulation of the Old vs. New Tax regimes for maximum optimization.</p>
        
        <div class="card">
          <h2><span class="menu-icon">🧙‍♂️</span> Salary & Tax Declarations</h2>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="tBase">Base Salary (₹)</label>
              <input id="tBase" type="number" placeholder="Base salary" value="1800000"/>
            </div>
            <div class="input-group">
              <label for="tHra">HRA Received (₹)</label>
              <input id="tHra" type="number" placeholder="HRA" value="360000"/>
            </div>
            <div class="input-group">
              <label for="t80c">Investments under 80C (₹)</label>
              <input id="t80c" type="number" placeholder="80C" value="150000"/>
            </div>
            <div class="input-group">
              <label for="tNps">NPS Contribution 80CCD(1B) (₹)</label>
              <input id="tNps" type="number" placeholder="NPS 80CCD(1B)" value="50000"/>
            </div>
            <div class="input-group">
              <label for="tHome">Home Loan Interest Paid (₹)</label>
              <input id="tHome" type="number" placeholder="Home loan interest" value="40000"/>
            </div>
          </div>
          <button id="taxBtn" class="primary-btn">Compare Regimes</button>
          <div id="taxOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Life Event Advisor -->
      <section id="tab-life-event" class="tab-view">
        <h1>Life Event Advisor</h1>
        <p class="subtitle">Get recommendations on allocating windfalls (bonuses, inheritance) or planning major life milestones.</p>
        
        <div class="card">
          <h2><span class="menu-icon">📅</span> Milestone Details</h2>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="eventType">Milestone Event Type</label>
              <select id="eventType">
                <option value="bonus">Bonus Windfall</option>
                <option value="inheritance">Inheritance</option>
                <option value="marriage">Marriage Setup</option>
                <option value="baby">New Family Member</option>
              </select>
            </div>
            <div class="input-group">
              <label for="eventAmount">Estimated Amount (₹)</label>
              <input id="eventAmount" type="number" placeholder="Event amount" value="500000"/>
            </div>
            <div class="input-group">
              <label for="eventRisk">Your Risk Tolerance</label>
              <select id="eventRisk">
                <option value="conservative">Conservative</option>
                <option value="moderate" selected>Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>
          <button id="eventBtn" class="primary-btn">Formulate Action Plan</button>
          <div id="eventOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Couple's Planner -->
      <section id="tab-couple" class="tab-view">
        <h1>Couple's Money Planner</h1>
        <p class="subtitle">Optimize joint investment plans, splits, and access mutual tax advantages as a unit.</p>
        
        <div class="card">
          <h2><span class="menu-icon">👥</span> Partner Inputs</h2>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="aIncome">Partner A Annual Income (₹)</label>
              <input id="aIncome" type="number" placeholder="Partner A income" value="1400000"/>
            </div>
            <div class="input-group">
              <label for="aNW">Partner A Net Worth (₹)</label>
              <input id="aNW" type="number" placeholder="Partner A net worth" value="3500000"/>
            </div>
            <div class="input-group">
              <label for="bIncome">Partner B Annual Income (₹)</label>
              <input id="bIncome" type="number" placeholder="Partner B income" value="1000000"/>
            </div>
            <div class="input-group">
              <label for="bNW">Partner B Net Worth (₹)</label>
              <input id="bNW" type="number" placeholder="Partner B net worth" value="2200000"/>
            </div>
            <div class="input-group">
              <label for="jointGoal">Combined Monthly SIP Target (₹)</label>
              <input id="jointGoal" type="number" placeholder="Joint monthly SIP target" value="80000"/>
            </div>
          </div>
          <button id="coupleBtn" class="primary-btn">Calculate Joint Contributions</button>
          <div id="coupleOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Mutual Fund X-Ray -->
      <section id="tab-mf-xray" class="tab-view">
        <h1>Mutual Fund Portfolio X-Ray</h1>
        <p class="subtitle">Analyze regular vs direct plan expense drags, overlapping stock holdings, and rebalancing recommendations.</p>
        
        <div class="card">
          <h2><span class="menu-icon">⚡</span> Portfolio Upload</h2>
          
          <div class="upload-zone" id="dropZone">
            <div class="upload-icon">📂</div>
            <div class="upload-text" id="dropZoneText">Drag & drop your CAMs / KFin statement here</div>
            <div class="upload-subtext">Supports statement files in .csv, .xlsx, or .xls format</div>
            <div class="upload-subtext" style="color: var(--primary); font-weight: 600;">Or click to browse from device</div>
            <input id="mfFile" type="file" accept=".csv,.xlsx,.xls" style="display: none;"/>
          </div>
          
          <div id="fileSelectedInfo" style="display: none;"></div>
          
          <button id="mfBtn" class="primary-btn" style="margin-top: 15px;">Analyze Portfolio Statement</button>
          <div id="mfOut" class="result-pane"></div>
        </div>
      </section>

      <!-- Tab: Smart Nudge Engine -->
      <section id="tab-nudges" class="tab-view">
        <h1>Smart Nudge Engine</h1>
        <p class="subtitle">Receive actionable monthly nudges customized to your specific financial profile.</p>
        
        <div class="card">
          <h2><span class="menu-icon">💡</span> Personalized Financial Action Plan</h2>
          <button id="nudgeBtn" class="primary-btn">Fetch Actionable Nudges</button>
          <div id="nudgeOut" class="result-pane"></div>
        </div>
      </section>
      
    </main>
  </div>
`;

// Helper functions for state storage
function saveState() {
  const inputs: Record<string, string> = {};
  const selectIds = ["eventType", "eventRisk"];
  const inputIds = [
    "age", "retirementAge", "income", "expenses", "investments", "ppf", "retireExpense",
    "mMonthlyExp", "mEmergency", "mLife", "mHealth", "mDebtRatio", "mEq", "mDebt", "mTaxSave", "mRetire",
    "tBase", "tHra", "t80c", "tNps", "tHome",
    "eventAmount",
    "aIncome", "aNW", "bIncome", "bNW", "jointGoal"
  ];
  
  [...inputIds, ...selectIds].forEach((id) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) {
      inputs[id] = el.value;
    }
  });
  localStorage.setItem("ai_money_mentor_state", JSON.stringify(inputs));
}

function loadState() {
  try {
    const saved = localStorage.getItem("ai_money_mentor_state");
    if (saved) {
      const inputs = JSON.parse(saved);
      Object.entries(inputs).forEach(([id, val]) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) {
          el.value = val as string;
        }
      });
    }
  } catch (e) {
    console.error("Failed to load local storage state", e);
  }
}

// Debounce helper to trigger live auto-calculation
function debounce(func: Function, wait: number) {
  let timeout: number;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json();
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function pct(value: number) {
  return `${(value || 0).toFixed(1)}%`;
}

function setHtml(id: string, html: string) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function toList(items: string[]) {
  return `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
}

// Custom Renderers for outputs

function renderFire(data: any) {
  const topMonths = (data.roadmap || []).slice(0, 6);
  return `
    <div class="metric-grid">
      <div class="metric-card highlight">
        <span>Target Corpus Target</span>
        <strong>${money(data.targetCorpus)}</strong>
      </div>
      <div class="metric-card">
        <span>Required Monthly SIP</span>
        <strong>${money(data.requiredMonthlySip)}</strong>
      </div>
      <div class="metric-card">
        <span>Retirement Target Date</span>
        <strong>${data.estimatedRetirementDate}</strong>
      </div>
      <div class="metric-card">
        <span>Emergency Fund Target</span>
        <strong>${money(data.emergencyFundTarget)}</strong>
      </div>
    </div>
    
    <h3>Insurance Shortfalls & Recommendations</h3>
    <div class="metric-grid">
      <div class="metric-card" style="border-color: var(--warning);">
        <span style="color: var(--warning);">Recommended Term Life Cover</span>
        <strong>${money(data.insuranceGaps.recommendedLifeCover)}</strong>
      </div>
      <div class="metric-card" style="border-color: var(--warning);">
        <span style="color: var(--warning);">Recommended Health Cover</span>
        <strong>${money(data.insuranceGaps.recommendedHealthCover)}</strong>
      </div>
    </div>
    
    <h3>First 6 Months Equity/Debt Glidepath SIP Roadmap</h3>
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Total SIP Allocation</th>
          <th>Equity Portion</th>
          <th>Debt Portion</th>
          <th>Asset Allocation Ratio (Equity / Debt)</th>
        </tr>
      </thead>
      <tbody>
        ${topMonths.map((m: any) => `
          <tr>
            <td>Month ${m.month}</td>
            <td><strong>${money(m.sipTotal)}</strong></td>
            <td style="color: var(--success);">${money(m.sipEquity)}</td>
            <td style="color: var(--primary);">${money(m.sipDebt)}</td>
            <td><span class="badge gold">${pct(m.targetAllocation.equity)}</span> / <span class="badge mint">${pct(m.targetAllocation.debt)}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// Circle SVG animation for overall Money Health score
function renderHealthDial(data: any) {
  const score = data.total;
  const circ = 440; // 2 * PI * 70 r
  const offset = circ - (Math.min(100, Math.max(0, score)) / 100) * circ;
  
  let strokeColor = "var(--error)";
  if (score >= 75) {
    strokeColor = "var(--success)";
  } else if (score >= 50) {
    strokeColor = "var(--primary)";
  }
  
  return `
    <div class="health-score-container">
      <svg class="health-gauge-svg" viewBox="0 0 160 160">
        <circle class="health-gauge-bg" cx="80" cy="80" r="70" />
        <circle class="health-gauge-fill" cx="80" cy="80" r="70" 
                style="stroke: ${strokeColor}; stroke-dashoffset: ${offset};" />
        <text class="health-gauge-text" x="80" y="85" text-anchor="middle" dominant-baseline="middle">${score.toFixed(1)}</text>
        <text class="health-gauge-label" x="80" y="115" text-anchor="middle" dominant-baseline="middle">SCORE</text>
      </svg>
    </div>
  `;
}

function renderHealth(data: any) {
  const d = data.dimensions;
  return `
    <div class="grid-2">
      <div class="card" style="margin-bottom: 0; background: var(--bg-elevated); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
        ${renderHealthDial(data)}
        <p class="muted" style="text-align: center; margin-top: 0; font-size: 14px;">Overall Money Health Score out of 100</p>
      </div>
      
      <div class="card" style="margin-bottom: 0; background: var(--bg-elevated); border: 1px solid var(--border-color);">
        <h3>Wellness Dimension Breakdowns</h3>
        <div class="bars-container">
          ${Object.entries(d).map(([k, v]) => {
            const label = k.replace(/([A-Z])/g, " $1").toLowerCase();
            return `
              <div class="dimension-row">
                <div class="dimension-label">
                  <span>${label}</span>
                  <strong>${Number(v).toFixed(1)}</strong>
                </div>
                <div class="dimension-bar-bg">
                  <div class="dimension-bar-fill" style="width: ${v}%"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderTax(data: any) {
  const maxTax = Math.max(1, data.oldRegime.tax, data.newRegime.tax);
  const oldPct = (data.oldRegime.tax / maxTax) * 100;
  const newPct = (data.newRegime.tax / maxTax) * 100;
  
  return `
    <div class="metric-grid">
      <div class="metric-card">
        <span>Gross Income</span>
        <strong>${money(data.grossIncome)}</strong>
      </div>
      <div class="metric-card">
        <span>Old Regime Tax Liability</span>
        <strong>${money(data.oldRegime.tax)}</strong>
      </div>
      <div class="metric-card">
        <span>New Regime Tax Liability</span>
        <strong>${money(data.newRegime.tax)}</strong>
      </div>
      <div class="metric-card success">
        <span>Optimal Regime</span>
        <strong>${data.optimalRegime}</strong>
      </div>
    </div>

    <h3>Tax Liability Scale Comparison</h3>
    <div class="tax-compare-bar-container">
      <div class="tax-compare-row">
        <div class="tax-compare-header">
          <span>Old regime slab tax</span>
          <strong>${money(data.oldRegime.tax)}</strong>
        </div>
        <div class="tax-bar-outer">
          <div class="tax-bar-inner old-regime" style="width: ${oldPct}%"></div>
        </div>
      </div>
      <div class="tax-compare-row">
        <div class="tax-compare-header">
          <span>New regime slab tax</span>
          <strong>${money(data.newRegime.tax)}</strong>
        </div>
        <div class="tax-bar-outer">
          <div class="tax-bar-inner ${data.optimalRegime === 'New Regime' ? 'optimal' : 'new-regime'}" style="width: ${newPct}%"></div>
        </div>
      </div>
    </div>

    <div class="alert-box">
      <span style="font-size: 20px;">💡</span>
      <div>
        Selecting the <strong>${data.optimalRegime}</strong> reduces your tax liability by <strong>${money(data.savingsVsOtherRegime)}</strong>.
      </div>
    </div>

    <div class="grid-2" style="margin-top: 24px;">
      <div class="card" style="margin-bottom: 0; background: var(--bg-surface); border-color: var(--border-color);">
        <h3>⚠️ Missed Deductions (Old Regime)</h3>
        ${toList(data.missedDeductions.length ? data.missedDeductions : ["No obvious missed deductions found."])}
      </div>
      <div class="card" style="margin-bottom: 0; background: var(--bg-surface); border-color: var(--border-color);">
        <h3>📈 Recommended Tax-Saving Instruments</h3>
        <table>
          <thead>
            <tr><th>Instrument</th><th>Liquidity Lock-in</th><th>Risk Profile</th></tr>
          </thead>
          <tbody>
            ${data.additionalInstruments.map((x: any) => `
              <tr>
                <td><strong>${x.name}</strong></td>
                <td>${x.liquidity}</td>
                <td><span class="badge gold">${x.risk}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderLifeEvent(data: any) {
  const emergency = data.allocation.emergencyFund;
  const debt = data.allocation.debtPrepayment;
  const invest = data.allocation.investment;
  const total = emergency + debt + invest;
  
  const emergencyPct = total > 0 ? (emergency / total) * 100 : 0;
  const debtPct = total > 0 ? (debt / total) * 100 : 0;
  const investPct = total > 0 ? (invest / total) * 100 : 0;
  
  return `
    <div class="metric-grid">
      <div class="metric-card" style="border-color: var(--warning);">
        <span style="color: var(--warning);">Emergency Fund Allocation</span>
        <strong>${money(emergency)}</strong>
      </div>
      <div class="metric-card">
        <span>Debt Prepayment Allocation</span>
        <strong>${money(debt)}</strong>
      </div>
      <div class="metric-card" style="border-color: var(--success);">
        <span style="color: var(--success);">Investment Allocation</span>
        <strong>${money(invest)}</strong>
      </div>
    </div>

    <h3>Suggested Distribution Split</h3>
    <div class="event-split-visualizer">
      <div class="event-split-track">
        <div class="event-split-item event-split-emergency" style="width: ${emergencyPct}%">${emergencyPct.toFixed(0)}%</div>
        <div class="event-split-item event-split-debt" style="width: ${debtPct}%">${debtPct.toFixed(0)}%</div>
        <div class="event-split-item event-split-investment" style="width: ${investPct}%">${investPct.toFixed(0)}%</div>
      </div>
      <div class="event-split-legend">
        <div class="legend-item"><div class="legend-dot" style="background-color: var(--warning);"></div> <span>Emergency Buffer</span></div>
        <div class="legend-item"><div class="legend-dot" style="background-color: #ec7a5c;"></div> <span>Debt Prepayment</span></div>
        <div class="legend-item"><div class="legend-dot" style="background-color: var(--success);"></div> <span>Market Investment</span></div>
      </div>
    </div>

    <h3>Advisor Recommendations</h3>
    ${toList(data.advice)}
  `;
}

function renderCouple(data: any) {
  const sipA = data.goalSipSplit.partnerA;
  const sipB = data.goalSipSplit.partnerB;
  const totalSip = sipA + sipB;
  
  const splitAPct = totalSip > 0 ? (sipA / totalSip) * 100 : 50;
  const splitBPct = totalSip > 0 ? (sipB / totalSip) * 100 : 50;
  
  return `
    <div class="metric-grid">
      <div class="metric-card">
        <span>Combined Net Worth</span>
        <strong>${money(data.combinedNetWorth)}</strong>
      </div>
      <div class="metric-card highlight">
        <span>Partner A SIP Target</span>
        <strong>${money(sipA)}</strong>
      </div>
      <div class="metric-card success">
        <span>Partner B SIP Target</span>
        <strong>${money(sipB)}</strong>
      </div>
    </div>

    <h3>Joint Monthly SIP Target Allocation</h3>
    <div class="sip-split-visualizer">
      <div class="sip-split-track">
        <div class="sip-split-a" style="width: ${splitAPct}%"></div>
        <div class="sip-split-b" style="width: ${splitBPct}%"></div>
      </div>
      <div class="sip-split-legend">
        <span class="legend-a">Partner A Split: ${splitAPct.toFixed(1)}%</span>
        <span class="legend-b">Partner B Split: ${splitBPct.toFixed(1)}%</span>
      </div>
    </div>

    <h3>Tax-Aware Joint Optimization Advice</h3>
    ${toList(data.taxTips)}
  `;
}

function renderMf(data: any) {
  return `
    <div class="metric-grid">
      <div class="metric-card">
        <span>Estimated Portfolio Value</span>
        <strong>${money(data.totalCurrentValue)}</strong>
      </div>
      <div class="metric-card success">
        <span>Computed Portfolio XIRR</span>
        <strong>${pct(data.xirr)}</strong>
      </div>
      <div class="metric-card">
        <span>Parsed Funds / AMCs</span>
        <strong>${data.funds} / ${data.amcs}</strong>
      </div>
      <div class="metric-card success">
        <span>Brokerage Fee Saved</span>
        <strong>${money(data.expenseDrag.annualCostDifference)}/yr</strong>
      </div>
    </div>

    <div class="grid-2">
      <div class="card" style="margin-bottom: 0; background: var(--bg-elevated); border-color: var(--border-color);">
        <h3>⚠️ Large Cap Portfolio Overlap (>20%)</h3>
        <p class="muted" style="margin-top: 0; font-size: 13px;">High stock concentration overlaps create drag.</p>
        <table>
          <thead>
            <tr><th>Stock Name</th><th>Overlap Weight %</th></tr>
          </thead>
          <tbody>
            ${(data.overlap || []).map((o: any) => `
              <tr>
                <td><strong>${o.stock}</strong></td>
                <td><span class="badge amber">${pct(o.overlapPct)}</span></td>
              </tr>
            `).join("") || `<tr><td colspan="2">No overlapping stocks detected above threshold.</td></tr>`}
          </tbody>
        </table>
      </div>
      
      <div class="card" style="margin-bottom: 0; background: var(--bg-elevated); border-color: var(--border-color);">
        <h3>⚡ Direct vs Regular Plan Expense Drag</h3>
        <div class="tax-compare-bar-container">
          <div class="tax-compare-row">
            <div class="tax-compare-header">
              <span>Your Current Avg Expense Ratio</span>
              <strong>${pct(data.expenseDrag.currentAvgExpenseRatio)}</strong>
            </div>
            <div class="tax-bar-outer">
              <div class="tax-bar-inner old-regime" style="width: ${Math.min(100, data.expenseDrag.currentAvgExpenseRatio * 40)}%"></div>
            </div>
          </div>
          <div class="tax-compare-row">
            <div class="tax-compare-header">
              <span>Direct Plan Equivalent</span>
              <strong>${pct(data.expenseDrag.estimatedDirectPlanExpenseRatio)}</strong>
            </div>
            <div class="tax-bar-outer">
              <div class="tax-bar-inner optimal" style="width: ${Math.min(100, data.expenseDrag.estimatedDirectPlanExpenseRatio * 40)}%"></div>
            </div>
          </div>
        </div>
        <p class="muted" style="font-size: 13px; margin-top: 15px;">
          Broker commissions drain <strong>${money(data.expenseDrag.annualCostDifference)}</strong> from your compound interest annually. Switching to Direct Mutual Funds increases your net CAGR.
        </p>
      </div>
    </div>

    <div class="card" style="margin-top: 24px; background: var(--bg-elevated); border-color: var(--border-color);">
      <h3>💡 Smart Portfolio Rebalancing Steps</h3>
      ${toList(data.rebalancePlan)}
    </div>
  `;
}

function renderNudges(data: any) {
  return `
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <span class="badge gold">Persona: ${data.persona}</span>
      <span class="badge mint">As of: ${data.date}</span>
    </div>
    <div class="nudges-deck">
      ${data.nudges.map((n: string, idx: number) => `
        <div class="nudge-card ${idx === 1 ? 'success-nudge' : ''}">
          <p style="margin: 0; font-size: 14px;"><strong>Nudge #${idx + 1}:</strong> ${n}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// Core Execution Bindings & Events

// Tab Selection Router
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const tabName = item.getAttribute("data-tab");
    if (!tabName) return;
    
    menuItems.forEach((x) => x.classList.remove("active"));
    item.classList.add("active");
    
    const tabViews = document.querySelectorAll(".tab-view");
    tabViews.forEach((v) => v.classList.remove("active"));
    
    const activeView = document.getElementById(`tab-${tabName}`);
    if (activeView) activeView.classList.add("active");
    
    // Close sidebar on mobile
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");
  });
});

// Mobile Sidebar Toggle
document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("mobile-open");
});

// Overview card clicks route to respective tabs
document.getElementById("widget-fire-card")?.addEventListener("click", () => {
  const fireTabButton = document.querySelector(".menu-item[data-tab='fire']") as HTMLElement | null;
  fireTabButton?.click();
});
document.getElementById("widget-tax-card")?.addEventListener("click", () => {
  const taxTabButton = document.querySelector(".menu-item[data-tab='tax']") as HTMLElement | null;
  taxTabButton?.click();
});

// Live updates and calculations mapping
const fireIds = ["age", "retirementAge", "income", "expenses", "investments", "ppf", "retireExpense"];
const runFire = async () => {
  try {
    const data = await post("/fire-plan", {
      age: Number((document.getElementById("age") as HTMLInputElement).value),
      retirementAge: Number((document.getElementById("retirementAge") as HTMLInputElement).value),
      annualIncome: Number((document.getElementById("income") as HTMLInputElement).value),
      annualExpenses: Number((document.getElementById("expenses") as HTMLInputElement).value),
      existingInvestments: Number((document.getElementById("investments") as HTMLInputElement).value),
      ppf: Number((document.getElementById("ppf") as HTMLInputElement).value),
      desiredMonthlyExpenseAtRetirement: Number((document.getElementById("retireExpense") as HTMLInputElement).value)
    });
    setHtml("fireOut", renderFire(data));
    
    // Update Overview Widget
    const fireVal = document.getElementById("widget-fire-val");
    if (fireVal) fireVal.innerText = money(data.targetCorpus);
  } catch (err) {
    console.error("FIRE calculation failed", err);
  }
};
const debouncedFire = debounce(() => {
  saveState();
  runFire();
}, 250);
fireIds.forEach((id) => {
  document.getElementById(id)?.addEventListener("input", debouncedFire);
});
document.getElementById("fireBtn")?.addEventListener("click", runFire);

const healthIds = ["mMonthlyExp", "mEmergency", "mLife", "mHealth", "mDebtRatio", "mEq", "mDebt", "mTaxSave", "mRetire"];
const runHealth = async () => {
  try {
    const data = await post("/money-health-score", {
      monthlyExpenses: Number((document.getElementById("mMonthlyExp") as HTMLInputElement).value),
      emergencyFund: Number((document.getElementById("mEmergency") as HTMLInputElement).value),
      lifeInsuranceCover: Number((document.getElementById("mLife") as HTMLInputElement).value),
      healthInsuranceCover: Number((document.getElementById("mHealth") as HTMLInputElement).value),
      debtToIncomeRatio: Number((document.getElementById("mDebtRatio") as HTMLInputElement).value),
      equityPct: Number((document.getElementById("mEq") as HTMLInputElement).value),
      debtPct: Number((document.getElementById("mDebt") as HTMLInputElement).value),
      taxSavedPotential: Number((document.getElementById("mTaxSave") as HTMLInputElement).value),
      retirementCorpusProgress: Number((document.getElementById("mRetire") as HTMLInputElement).value)
    });
    setHtml("healthOut", renderHealth(data));
    setHtml("overviewHealthDial", renderHealthDial(data));
  } catch (err) {
    console.error("Health calculation failed", err);
  }
};
const debouncedHealth = debounce(() => {
  saveState();
  runHealth();
}, 250);
healthIds.forEach((id) => {
  document.getElementById(id)?.addEventListener("input", debouncedHealth);
});
document.getElementById("healthBtn")?.addEventListener("click", runHealth);

const taxIds = ["tBase", "tHra", "t80c", "tNps", "tHome"];
const runTax = async () => {
  try {
    const data = await post("/tax-wizard", {
      baseSalary: Number((document.getElementById("tBase") as HTMLInputElement).value),
      hra: Number((document.getElementById("tHra") as HTMLInputElement).value),
      deduction80C: Number((document.getElementById("t80c") as HTMLInputElement).value),
      nps80ccd1b: Number((document.getElementById("tNps") as HTMLInputElement).value),
      homeLoanInterest: Number((document.getElementById("tHome") as HTMLInputElement).value)
    });
    setHtml("taxOut", renderTax(data));
    
    // Update Overview Widget
    const taxVal = document.getElementById("widget-tax-val");
    if (taxVal) taxVal.innerText = data.optimalRegime;
  } catch (err) {
    console.error("Tax calculation failed", err);
  }
};
const debouncedTax = debounce(() => {
  saveState();
  runTax();
}, 250);
taxIds.forEach((id) => {
  document.getElementById(id)?.addEventListener("input", debouncedTax);
});
document.getElementById("taxBtn")?.addEventListener("click", runTax);

const eventIds = ["eventType", "eventAmount", "eventRisk"];
const runEvent = async () => {
  try {
    const data = await post("/life-event", {
      eventType: (document.getElementById("eventType") as HTMLSelectElement).value,
      amount: Number((document.getElementById("eventAmount") as HTMLInputElement).value),
      risk: (document.getElementById("eventRisk") as HTMLSelectElement).value
    });
    setHtml("eventOut", renderLifeEvent(data));
  } catch (err) {
    console.error("Event advisor calculation failed", err);
  }
};
const debouncedEvent = debounce(() => {
  saveState();
  runEvent();
}, 250);
eventIds.forEach((id) => {
  document.getElementById(id)?.addEventListener("input", debouncedEvent);
  document.getElementById(id)?.addEventListener("change", debouncedEvent);
});
document.getElementById("eventBtn")?.addEventListener("click", runEvent);

const coupleIds = ["aIncome", "aNW", "bIncome", "bNW", "jointGoal"];
const runCouple = async () => {
  try {
    const data = await post("/couple-plan", {
      partnerA: {
        income: Number((document.getElementById("aIncome") as HTMLInputElement).value),
        netWorth: Number((document.getElementById("aNW") as HTMLInputElement).value)
      },
      partnerB: {
        income: Number((document.getElementById("bIncome") as HTMLInputElement).value),
        netWorth: Number((document.getElementById("bNW") as HTMLInputElement).value)
      },
      sharedGoalsAmount: Number((document.getElementById("jointGoal") as HTMLInputElement).value)
    });
    setHtml("coupleOut", renderCouple(data));
  } catch (err) {
    console.error("Couple calculation failed", err);
  }
};
const debouncedCouple = debounce(() => {
  saveState();
  runCouple();
}, 250);
coupleIds.forEach((id) => {
  document.getElementById(id)?.addEventListener("input", debouncedCouple);
});
document.getElementById("coupleBtn")?.addEventListener("click", runCouple);

// Drag & Drop Mutual Fund upload zone logic
const dropZone = document.getElementById("dropZone")!;
const fileInput = document.getElementById("mfFile") as HTMLInputElement;
const dropZoneText = document.getElementById("dropZoneText")!;
const fileSelectedInfo = document.getElementById("fileSelectedInfo")!;

dropZone.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  handleFileSelection();
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e: DragEvent) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  if (e.dataTransfer?.files.length) {
    fileInput.files = e.dataTransfer.files;
    handleFileSelection();
  }
});

function handleFileSelection() {
  const file = fileInput.files?.[0];
  if (file) {
    dropZoneText.innerText = "File Attached";
    fileSelectedInfo.style.display = "block";
    fileSelectedInfo.innerHTML = `
      <div class="file-info">
        <span>📄 <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)</span>
        <button class="file-reset-btn" id="fileResetBtn">Reset</button>
      </div>
    `;
    
    document.getElementById("fileResetBtn")?.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop click from bubling up to trigger dropZone click
      resetFileInput();
    });
    
    runMfXray();
  }
}

function resetFileInput() {
  fileInput.value = "";
  dropZoneText.innerText = "Drag & drop your CAMs / KFin statement here";
  fileSelectedInfo.style.display = "none";
  fileSelectedInfo.innerHTML = "";
  setHtml("mfOut", "");
}

async function runMfXray() {
  const file = fileInput.files?.[0];
  if (!file) return setHtml("mfOut", `<p class="error">Please upload a file.</p>`);
  
  setHtml("mfOut", `
    <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px;">
      <span class="loader-spinner"></span>
      <span>Processing holdings statement and computing portfolio variables...</span>
    </div>
  `);
  
  try {
    const fd = new FormData();
    fd.append("statement", file);
    const res = await fetch(`${apiBase}/mf-xray`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Failed to parse statement");
    const data = await res.json();
    setHtml("mfOut", renderMf(data));
  } catch (err) {
    setHtml("mfOut", `
      <div class="alert-box" style="border-color: var(--error); background: var(--error-glow); color: var(--error);">
        <strong>Error:</strong> Calculation failed. Ensure file is a valid CAMs CSV or Excel spreadsheet. (${(err as Error).message})
      </div>
    `);
  }
}
document.getElementById("mfBtn")?.addEventListener("click", runMfXray);

// Nudge engine updates
const runNudges = () => {
  const nudges = {
    date: new Date().toISOString().slice(0, 10),
    nudges: [
      "Increase SIP by 8% this month to stay inflation-adjusted.",
      "Shift one regular-plan fund to direct-plan equivalent.",
      "Top up emergency fund by ₹20,000 before adding new thematic funds."
    ],
    persona: "Mid-career salaried investor"
  };
  setHtml("nudgeOut", renderNudges(nudges));
  setHtml("overviewNudges", renderNudges(nudges));
};
document.getElementById("nudgeBtn")?.addEventListener("click", runNudges);
document.getElementById("overviewNudgeBtn")?.addEventListener("click", runNudges);

// Initialization: Load local storage state, then run baseline calculations
loadState();

// Trigger initial calculations
runFire();
runHealth();
runTax();
runEvent();
runCouple();
runNudges();
