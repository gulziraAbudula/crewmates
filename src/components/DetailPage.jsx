import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function DetailPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let { data } = await supabase.from("Crewmates").select("*").eq("id", id).single();
      setCrewmate(data);
    }
    fetchData();
  }, [id]);

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div className="detail">
      <h2>{crewmate.name}'s Profile</h2>
      <p>Role: {crewmate.role}</p>
      <p>Created: {new Date(crewmate.created_at).toLocaleString()}</p>
      <Link to={`/edit/${crewmate.id}`} className="edit-link">Edit</Link>
    </div>
  );
}
