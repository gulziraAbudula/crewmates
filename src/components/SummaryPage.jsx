import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let { data, error } = await supabase.from("Crewmates").select("*").order("created_at", { ascending: false });
      console.log("Fetched Crewmates:", data, error);
      setCrewmates(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="summary">
      <h2>Crewmate Summary</h2>
      {loading ? (
        <p>Loading crewmates...</p>
      ) : crewmates.length > 0 ? (
        crewmates.map((c) => (
          <div className="card" key={c.id}>
            <Link to={`/detail/${c.id}`}>{c.name} - {c.role}</Link>
            <Link to={`/edit/${c.id}`} className="edit-link"> ✏️ Edit</Link>
          </div>
        ))
      ) : (
        <p>No crewmates found. Start by creating one!</p>
      )}
    </div>
  );
}
