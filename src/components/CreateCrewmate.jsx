import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function CreateCrewmate() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Captain");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Name:", name, "Role:", role); // Log input values

    const { data, error } = await supabase
      .from("Crewmates")
      .insert({ name, role })
      .select(); // This is equivalent to RETURNING * in SQL

    console.log("Insert Response:", data, error); // Log the response and error

    if (!error) {
      console.log("Navigating to /summary");
      navigate("/summary");
    } else {
      console.error("Error inserting crewmate:", error); // Log the error object
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Crewmate</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Captain">Captain</option>
        <option value="Engineer">Engineer</option>
        <option value="Pilot">Pilot</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
