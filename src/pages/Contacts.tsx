import { Search, ChevronDown, LayoutGrid } from "lucide-react";

type Status = "Active" | "In Progress" | "Converted" | "Cold" | "Not Interested";
interface Contact { name: string; role: string; status: Status }

const ROWS: Contact[] = [
  { name: "John Doe", role: "Broker", status: "Active" },
  { name: "Ananya Verma", role: "Buyer", status: "In Progress" },
  { name: "Ravi Kapoor", role: "Developer", status: "Cold" },
  { name: "Emily Mehra", role: "Buyer", status: "Converted" },
  { name: "John Doe", role: "Seller", status: "Not Interested" },
  { name: "Ananya Verma", role: "Buyer", status: "Active" },
  { name: "Ravi Kapoor", role: "Investor", status: "Active" },
  { name: "Emily Mehra", role: "Broker", status: "Active" },
];
const cls = (s: Status) => (s === "In Progress" ? "Progress" : s === "Not Interested" ? "Not" : s);

const FILTERS: [string, string[]][] = [
  ["Status", ["Active", "In Progress", "Converted", "Cold", "Not Interested"]],
  ["Role", ["Buyer", "Seller", "Investor", "Broker"]],
  ["Assigned To", ["Jessica", "Mohit", "Arjun", "Emily"]],
  ["City", ["Bengaluru", "Pune", "Mumbai", "Hyderabad", "Delhi"]],
  ["Lead Source", ["Website Form", "Referral", "Facebook Ads", "Walk-In", "Email Campaign"]],
];

export default function Contacts() {
  return (
    <div className="contacts">
      <aside className="filters">
        <h2>Filters</h2>
        <div className="search wide" style={{ width: "100%", height: 20, fontSize: 8 }}><span>Search by Contact Name</span><Search size={10} /></div>
        {FILTERS.map(([title, opts]) => (
          <div key={title}>
            <h4>{title}</h4>
            {opts.map((o) => <label key={o}><span className="box" />{o}</label>)}
          </div>
        ))}
        <button className="btn-gold">Apply Filters</button>
        <button className="btn-out">Reset Filters</button>
      </aside>

      <section className="c-main">
        <h2 style={{ fontSize: 18, fontFamily: "Inter", fontWeight: 600, margin: "6px 0 8px" }}>All Contacts</h2>
        <div className="c-bar">
          <button className="btn-create">+ Create Contact</button>
          <span style={{ flex: 1 }} />
          <div className="search wide" style={{ width: 168, fontSize: 9 }}><span>Search Contact</span><Search size={16} color="#111" /></div>
          <span className="tool" style={{ display: "flex", gap: 4, alignItems: "center" }}><LayoutGrid size={12} /><ChevronDown size={9} /></span>
          <span className="tool" style={{ display: "flex", gap: 4, alignItems: "center" }}>Actions <ChevronDown size={9} /></span>
        </div>

        <table className="ctable">
          <thead>
            <tr>{["Contact Name", "Company", "Role", "Phone No.", "Deal Stage", "Status", "Assigned to"].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td><b>{r.name}</b><small>Email: john@urbanrealty.com</small></td>
                <td>Urban Realty</td><td>{r.role}</td><td>+91 9411521487</td><td>Negotiation</td>
                <td><span className={`st ${cls(r.status)}`}>{r.status}</span></td>
                <td>Jessica Chen</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="pager">
          <span>‹ Prev</span>|<span className="cur">1</span><span>2</span><span>3</span>|<span>Next ›</span>
        </nav>
      </section>
    </div>
  );
}
