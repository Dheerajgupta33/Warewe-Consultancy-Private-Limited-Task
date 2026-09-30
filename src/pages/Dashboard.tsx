import type { ReactNode } from "react";
import { House, UserRound, Handshake, Coins, ArrowUpRight, ArrowDownRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const C = { gold: "#D4AF37", mid: "#EBDDA6", light: "#F5EDD3" };

const Chip = ({ v, down }: { v: string; down?: boolean }) => (
  <span className={`chip ${down ? "down" : "up"}`}>{v} {down ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}</span>
);
const Kpi = ({ icon, label, value, chip, down }: { icon: ReactNode; label: string; value: string; chip: string; down?: boolean }) => (
  <div className="card kpi">
    <div className="top"><span className="ico">{icon}</span>{label}</div>
    <div className="val">{value}<Chip v={chip} down={down} /></div>
  </div>
);
const Legend = () => (
  <div className="legend">
    {[["Angel Plaza", C.gold], ["Angel Garden", C.mid], ["None", C.light]].map(([n, c]) => (
      <span key={n}><i style={{ background: c }} />{n}</span>
    ))}
  </div>
);

/* Donut: [label, %, colour] drawn clockwise from 12 o'clock */
const SOURCES: [string, number, string][] = [["Inbound Call", 37.87, C.light], ["Reference", 30.6, C.gold], ["Facebook", 6.78, "#EBD07A"], ["Website", 24.83, C.mid]];
function Donut() {
  const r = 80, circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 420 230" width="100%" height="230">
      <g transform="translate(210 115) rotate(-90)">
        {SOURCES.map(([n, p, c]) => {
          const el = <circle key={n} r={r} fill="none" stroke={c} strokeWidth="60" strokeDasharray={`${(p / 100) * circ} ${circ}`} strokeDashoffset={-(acc / 100) * circ} />;
          acc += p; return el;
        })}
      </g>
      <g fontSize="9" fill="#444">
        <text x="285" y="52">Inbound Call</text><text x="285" y="63">9 (37.87%)</text>
        <text x="20" y="72">Website</text><text x="20" y="83">10 (24.83%)</text>
        <text x="20" y="190">Facebook</text><text x="20" y="201">1 (6.78%)</text>
        <text x="330" y="188">Reference</text><text x="330" y="199">1 (30.6%)</text>
      </g>
    </svg>
  );
}

const STAGES: [string, number[]][] = [
  ["Interested", [3, 2.4, 2]], ["Site Visit Done", [3.8, 3.2, 3.2]], ["Unit Shortlisted", [3.5, 3.3, 2.6]],
  ["Contracts Signed", [3.8, 3.4, 3.2]], ["Offer Initiated", [3.2, 3.6, 2.2]], ["Offer Accepted", [3.8, 3.6, 3]],
];

const LISTINGS = [
  ["Maplewood House", "House", "12", "Rs.85L", "+35", "125", "8/12 Occupied", "occ"],
  ["Serenity Villa", "Villa", "9300", "Rs.2.8Cr", "+40", "930", "Available", "avail"],
  ["Rosehill Cottage", "House", "25", "Rs.1.1Cr", "+15", "355", "Available", "avail"],
  ["Skyline Edge", "Apartment", "17", "Rs.75L", "+11", "425", "Sold Out", "sold"],
];
const LEADS = [["John Doe", "New York"], ["Jessica Chen", "California, LA"], ["Evan Chris", "New York"], ["Jack B.", "Ohio, Columbus"], ["Emily Paris", "California, LA"]];
const REMINDERS = [["Submit Final Offer- Villa Deal", "Finalize and send offer documents."], ["Review Contract with Legal", "Ensure attorney reviews apartment deal contract today."], ["Call Jessica Chen – Follow-up", "Discuss her feedback after site visit to Angel Plaza."]];
const SCHEDULE: [string, string, boolean?][] = [
  ["Visit Client- Angel Plaza", "Sector 45, Gurugram, Haryana", true], ["Visit Client – Site Walkthrough", "Whitefield Road, Bengaluru, Karnataka", true],
  ["Follow Up – Jessica Chen", "jessica.chen@email.com", true], ["Follow Up – Roger Bouchard", "roger.bouchard@clientmail.com", true],
  ["Submit Final Offer – Villa Deal", "Finalize and send offer documents."], ["Submit Internal Review – Apartment PricingFinal Offer – Villa Deal", "Update CRM with latest market rates."],
];
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");

export default function Dashboard() {
  const days = [...Array(2).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <main className="dash">
      <section className="left">
        <Kpi icon={<House size={16} />} label="Active Listing" value="23" chip="-12%" down />
        <Kpi icon={<UserRound size={16} />} label="Active Leads" value="120" chip="+12%" />
        <Kpi icon={<Handshake size={16} />} label="Total Closed" value="42" chip="+12%" />
        <Kpi icon={<Coins size={16} />} label="Total Revenue" value="Rs.22Cr." chip="+12%" />

        <div className="card chart-card span2"><h2>Deals by Lead Source</h2><Donut /></div>

        <div className="card chart-card span2">
          <h2>Deals by Stages by Development</h2>
          <div style={{ display: "flex" }}>
            <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 11, marginTop: 20 }}>Record Count</span>
            <div className="bars" style={{ flex: 1, marginLeft: 16 }}>
              {[10, 7.5, 5, 2.5, 0].map((t) => <span key={t} className="y" style={{ bottom: `${(t / 10) * 100}%`, transform: "translateY(50%)" }}>{t}</span>)}
              {STAGES.map(([n, v]) => (
                <div key={n} className="col" style={{ position: "relative" }}>
                  {v.map((h, i) => <div key={i} style={{ height: h * 13, background: [C.gold, C.mid, C.light][i] }} />)}
                  <span className="x" style={{ right: -4 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 12, margin: "62px 0 12px" }}>Stage</p>
          <Legend />
        </div>

        <div className="stack">
          <div className="card">
            <h2>Deals by Sales People by Development</h2>
            {[[100, 170, 260], [50, 80, 150]].map((r, i) => (
              <div key={i} className="hbar">
                {r.map((w, j) => <div key={j} style={{ width: `${w / 4.1}%`, background: [C.gold, C.mid, C.light][j] }} />)}
              </div>
            ))}
            <div className="sub" style={{ margin: "6px 0", textAlign: "center", fontSize: 11 }}>Record Count</div>
            <Legend />
          </div>
          <div className="card">
            <h2>Total Deals Closed</h2>
            <div style={{ height: 38, borderRadius: 4, background: "#f3f0e8", marginTop: 12, overflow: "hidden" }}>
              <div style={{ width: "24%", height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.light})` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
              <span><b style={{ fontSize: 22, fontWeight: 500 }}>42</b> <span className="sub">Closed Deals</span></span>
              <span><b style={{ fontSize: 22, fontWeight: 500 }}>132</b> <span className="sub">On Progress</span></span>
            </div>
          </div>
        </div>

        <div className="card span2">
          <h2>Deals in Pipeline by Development</h2>
          <table className="table" style={{ marginTop: 14 }}>
            <thead><tr><th>Development Name</th><th style={{ textAlign: "right" }}>Record Count</th></tr></thead>
            <tbody>{[["None", 14], ["Angel Plaza", 3], ["Angel Garden", 1]].map(([n, c]) => (
              <tr key={n}><td style={{ padding: "10px 8px" }}>{n}</td><td style={{ textAlign: "right", paddingRight: 8 }}>{c}</td></tr>
            ))}</tbody>
          </table>
        </div>

        <div className="card span3">
          <h2>Active Listing</h2>
          <table className="table" style={{ marginTop: 12 }}>
            <thead><tr>{["Property", "Type", "Units", "Price", "Active Leads", "Views", "Status"].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{LISTINGS.map(([n, t, u, p, l, v, s, k]) => (
              <tr key={n}>
                <td><div style={{ display: "flex", gap: 8, alignItems: "center", width: 90, fontSize: 11 }}><span className="thumb" />{n}</div></td>
                <td>{t}</td><td>{u}</td><td>{p}</td>
                <td><span className="avatar sm" style={{ width: 24, height: 24 }}>A</span><span className="avatar sm" style={{ width: 24, height: 24 }}>B</span><span className="avatar more" style={{ width: 24, height: 24, fontSize: 8 }}>{l}</span></td>
                <td>{v}</td><td><span className={`pill ${k}`}>{s}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="card">
          <h2>Leads Contacts</h2>
          <ul className="people">{LEADS.map(([n, c]) => (
            <li key={n}><span className="avatar">{initials(n)}</span><div><span style={{ fontSize: 13 }}>{n}</span><br /><small>{c}</small></div><span className="round"><Phone size={12} /></span></li>
          ))}</ul>
        </div>
      </section>

      <aside className="rail">
        <div className="card rem">
          <h2 style={{ margin: "4px 0 10px" }}>Reminder</h2>
          <div className="item hi"><b>Follow-Ups</b><div className="sub">15 leads need to be followed up.</div>
            <div style={{ marginTop: 6 }}>{["A", "B", "C", "D"].map((a) => <span key={a} className="avatar sm">{a}</span>)}<span className="avatar more sm">+11</span></div></div>
          {REMINDERS.map(([t, d]) => <div className="item" key={t}><b>{t}</b><div className="sub">{d}</div></div>)}
        </div>

        <div className="card cal">
          <div className="cal-head">July 2025<span style={{ display: "flex", gap: 24 }}><ChevronLeft size={20} /><ChevronRight size={20} /></span></div>
          <div className="cal-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
            {days.map((d, i) => (
              <span key={i}><span className={`d ${d === 8 ? "today" : ""}`} style={[10, 11, 14].includes(d) ? { borderBottom: `2px solid ${d === 11 ? "#f0c93a" : "#3aa89a"}` } : undefined}>{d}</span></span>
            ))}
          </div>
        </div>

        <div className="card sched" style={{ borderTop: "1px solid var(--line)" }}>
          <h3>My Schedule</h3>
          {SCHEDULE.map(([t, d, teal]) => <div key={t} className={`ev ${teal ? "teal" : ""}`}>{t}<div className="sub">{d}</div></div>)}
        </div>
      </aside>
    </main>
  );
}
