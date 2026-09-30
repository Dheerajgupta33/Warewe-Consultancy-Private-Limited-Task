import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import "./styles.css";

const NAV = ["Home", "Developments", "Buildings", "Units", "Leads", "Companies", "Contacts", "Deals", "Activities", "Attorney Firms", "Reports"] as const;
type Page = (typeof NAV)[number];

export default function App() {
  const [page, setPage] = useState<Page>("Home");
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 22V8l4-4v18M9 22V2l4 4v16M15 22V9l4 3v10" />
          </svg>
          <b>REALTOR360</b>
        </div>
        {NAV.map((n) => (
          <a key={n} className={page === n ? "on" : ""} onClick={() => setPage(n)}>{n}</a>
        ))}
        <a>···</a>
        <span className="grow" />
        <div className="search"><span>Search...</span><Search size={18} color="#111" /></div>
        <span style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 20 }}>
          <span className="avatar" style={{ width: 32, height: 32 }}>JD</span>
          <ChevronDown size={12} />
        </span>
      </nav>
      {page === "Contacts" ? <Contacts /> : <Dashboard />}
    </>
  );
}
