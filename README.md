# AI Money Mentor

Complete end-to-end prototype for ET hackathon track: an AI-powered personal finance mentor focused on Indian users.

## Functionalities Included

- FIRE Path Planner with month-by-month SIP roadmap, glidepath, insurance gap and emergency fund target
- Money Health Score across 6 dimensions
- Life Event Financial Advisor (bonus, inheritance, marriage, new baby)
- Tax Wizard with old vs new regime comparison and deduction suggestions
- Couple's Money Planner with goal SIP split and tax tips
- Mutual Fund Portfolio X-Ray with statement upload, XIRR, overlap, expense drag and rebalancing suggestions
- Innovation layer: Smart Nudge Engine for monthly actionable nudges

## Tech Stack

- Frontend: Vite + TypeScript (single-page dashboard)
- Backend: Node.js + Express
- Parsing: CSV/XLSX statement handling with `papaparse` and `xlsx`

## Project Structure

- `frontend/` - UI and module workflows
- `backend/` - APIs and financial calculation engine
- `docs/architecture.md` - architecture and orchestration design
- `docs/impact-model.md` - quantified impact assumptions and model
- `sample-data/cams-sample.csv` - sample MF statement for demo

## Local Setup

### 1) Prerequisites

- Node.js 18+ (recommended 20+)

### 2) Install dependencies

From project root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3) Run full app

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## Demo Flow

1. Open FIRE Path Planner and click `Generate Dynamic FIRE Plan`.
2. Change retirement age from `50` to `55` and observe auto-refresh of output.
3. Run Tax Wizard using default edge-case values.
4. Upload `sample-data/cams-sample.csv` in MF X-Ray.
5. Verify XIRR, overlap list, and tax-aware rebalance actions.

## Verification Commands

```bash
npm run build --prefix frontend
node backend/index.js
```

## Notes

- Current tax logic is made transparent and deterministic for demo verifiability.
- This is a hackathon-grade working prototype, not investment/tax advice.
