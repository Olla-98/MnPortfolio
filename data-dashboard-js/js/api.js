import { state } from "./state.js";
import { renderApp } from "./app.js";

const { createClient } = supabase;

export const supabaseClient = createClient(
  "https://tjdkytbzdsgbvgfvubxw.supabase.co",
  "sb_publishable_SP9vIJGdO62BnpxBlv7tDA_HohmLtyS"
);

export async function fetchUsers() { // API-data ophalen en in state opslaan
  try {
    state.loading = true;
    renderApp();

    const { data, error } = await supabaseClient // API-data ophalen via Supabase client
      .from("users")
      .select("*");

    if (error) throw new Error(error.message); // Foutmelding tonen als API-aanroep mislukt

    state.users = data;// API-data opslaan in state
    state.error = null;// Foutmelding resetten bij succesvolle data-opslag
  } catch (error) {
    state.error = error.message;
  } finally { // Laadstatus resetten en app renderen, ongeacht succes of fout
    state.loading = false;
    renderApp();
  }
}