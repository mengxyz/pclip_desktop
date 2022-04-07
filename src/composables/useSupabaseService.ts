import client from "../lib/supabase";
import { SupabaseServices } from "../services/supabase.service";
const sbs = new SupabaseServices(client);
export default () => {
  return { sbs };
};
