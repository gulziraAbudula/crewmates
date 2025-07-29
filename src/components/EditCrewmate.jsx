import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function EditCrewmate() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching Crewmate with ID:", id); // Log the ID
      const { data, error } = await supabase
        .from("Crewmates") // Ensure this matches the table name
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setName(data.name);
        setRole(data.role);
      } else {
        console.error("Error fetching crewmate:", error);
      }
    }
    fetchData();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Crewmates") // Ensure this matches the table name
      .update({ name, role })
      .eq("id", id);

    console.log("Update Response:", data, error); // Log the response and error

    if (!error) {
      navigate("/summary");
    } else {
      console.error("Error updating crewmate:", error);
    }
  }

  async function handleDelete() {
    console.log("Deleting Crewmate with ID:", id); // Log the ID
    const { data, error } = await supabase
      .from("Crewmates") // Ensure this matches the table name
      .delete()
      .eq("id", id);

    console.log("Delete Response:", data, error); // Log the response and error

    if (!error) {
      navigate("/summary");
    } else {
      console.error("Error deleting crewmate:", error);
    }
  }

  return (
    <form className="form" onSubmit={handleUpdate}>
      <h2>Edit Crewmate</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Captain">Captain</option>
        <option value="Engineer">Engineer</option>
        <option value="Pilot">Pilot</option>
      </select>
      <button type="submit">Update</button>
      <button
        type="button"
        onClick={handleDelete}
        className="delete-button"
      >
        Delete
      </button>
    </form>
  );
}
