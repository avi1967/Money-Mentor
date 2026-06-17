# Architecture (AI Money Mentor)

## 1) High-Level Diagram

```mermaid
flowchart LR
  U[User in Web UI] --> FE[Frontend Dashboard]
  FE -->|JSON API| BE[Express Backend]
  FE -->|File Upload| BE

  BE --> FIRE[FIRE Planner Engine]
  BE --> TAX[Tax Wizard Engine]
  BE --> HEALTH[Money Health Score Engine]
  BE --> LIFE[Life Event Advisor Engine]
  BE --> COUPLE[Couple Planner Engine]
  BE --> XRY[MF X-Ray Engine]
  BE --> NUDGE[Smart Nudge Layer]

  XRY --> PARSE[CSV/XLSX Parser]
  PARSE --> XIRR[XIRR + Overlap + Expense Drag]
```

## 2) Agent/Module Roles

- **Input Normalizer**: Converts UI/file inputs into validated numeric payloads.
- **Computation Engines**:
  - FIRE: corpus target + SIP glidepath by month
  - TAX: old/new regime slab tax and deduction gaps
  - HEALTH: weighted 6-dimension financial wellness score
  - LIFE: event-triggered allocation strategy
  - COUPLE: combined net worth + tax-aware SIP split
  - X-RAY: portfolio reconstruction + XIRR + overlap + drag + rebalancing
- **Recommendation Layer**: Emits plain-language recommendations and nudges.

## 3) Communication and Flow

1. User enters/updates data in frontend cards.
2. Frontend calls corresponding backend endpoint.
3. Backend runs deterministic calculators and returns JSON.
4. Frontend renders readable JSON for traceable hackathon judging.

## 4) Error Handling

- Missing file upload for MF X-Ray returns `400`.
- Safe numeric defaults prevent NaN propagation.
- CORS enabled for local frontend/backend origins.
- Calculation steps are structured and inspectable in response payloads.

## 5) Why This Design

- Modular calculators allow independent upgrades per feature.
- Deterministic backend makes output verifiable (important for tax/FIRE scoring rubric).
- Single dashboard minimizes demo friction in 3-minute pitch walkthrough.
