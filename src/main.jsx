import React from 'react'
import ReactDOM from 'react-dom/client'
import GreenChainApp, { CARBON_MARKETS, PLANS, Sparkline, T, useLang } from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GreenChainApp />
  </React.StrictMode>,
)
// ── CARBON CREDITS PAGE ────────────────────────────────────────
export function CarbonCreditsPage() {
  const { t } = useLang();
  return (
    <>
      <div className="gc-page-header">
        <div className="gc-page-eyebrow">{t.creditsEyebrow}</div>
        <div className="gc-page-title">{t.creditsTitle}</div>
        <div className="gc-page-meta">{t.creditsMeta}</div>
      </div>
      <div className="gc-portfolio-panel" style={{ marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { label: t.totalCredits, val: "4,820 t", color: T.green },
            { label: t.portfolioVal, val: "$329,000", color: T.green },
            { label: t.offsetGoal, val: "82%", color: T.teal },
            { label: "Verified Registries", val: "3 Active", color: T.textPri },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: T.fontMono, fontSize: 8, color: T.textMute, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="gc-grid-2">
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">Live Market Prices</span>
            <span className="gc-panel-badge live">LIVE</span>
          </div>
          <div className="gc-panel-body" style={{ padding: "8px 16px" }}>
            {CARBON_MARKETS.map((m, i) => (
              <div key={i} className="gc-mkt-row">
                <div className="gc-mkt-name">{m.type}</div>
                <Sparkline up={m.up} />
                <div style={{ fontFamily: T.fontMono, fontSize: 9, color: T.textMute, width: 60, textAlign: "right" }}>{m.vol}</div>
                <div className="gc-mkt-price">{m.price}</div>
                <div className={`gc-mkt-change ${m.up ? "gc-green" : "gc-red"}`}>{m.change}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gc-panel">
          <div className="gc-panel-header">
            <span className="gc-panel-title">Trade Desk</span>
            <span className="gc-panel-badge" style={{ color: T.teal, borderColor: T.teal + "44" }}>EU ETS ACTIVE</span>
          </div>
          <div className="gc-panel-body">
            {[
              { type: "EU ETS", price: "$68.40", avail: "12,400 t" },
              { type: "Gold Standard", price: "$18.20", avail: "3,200 t" },
              { type: "VCS (Verra)", price: "$11.60", avail: "28,500 t" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.border}44` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 600, color: T.textPri }}>{c.type}</span>
                  <span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 700, color: T.green }}>{c.price}<span style={{ fontFamily: T.fontMono, fontSize: 8, color: T.textMute }}> /t</span></span>
                </div>
                <div style={{ fontFamily: T.fontMono, fontSize: 9, color: T.textMute, marginBottom: 10 }}>Available: {c.avail}</div>
                <div>
                  <button className="gc-trade-btn buy">{t.buyCredits}</button>
                  <button className="gc-trade-btn sell">{t.sellCredits}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gc-panel">
        <div className="gc-panel-header">
          <span className="gc-panel-title">{t.pricingTitle}</span>
          <span className="gc-panel-badge" style={{ color: T.teal, borderColor: T.teal + "44" }}>{t.pricingSubtitle}</span>
        </div>
        <div className="gc-panel-body">
          <div className="gc-pricing-grid">
            {PLANS.map((plan, i) => {
              const { t: tl } = useLang();
              return (
                <div key={i} className={`gc-plan${plan.popular ? " popular" : ""}`}>
                  {plan.popular && <div className="gc-plan-popular-badge">{tl.mostPopular}</div>}
                  <div className="gc-plan-name">{tl[plan.key]}</div>
                  <div className="gc-plan-price">{plan.price}</div>
                  {!plan.noPrice && <div className="gc-plan-period">{tl.perMonth}</div>}
                  <div className="gc-plan-divider" />
                  {plan.features.map((f, j) => (
                    <div key={j} className="gc-plan-feature">{f}</div>
                  ))}
                  <button className="gc-plan-cta">
                    {plan.noPrice ? tl.contactSales : tl.getStarted}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
