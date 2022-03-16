import axios from "axios";
import { Session } from "@supabase/supabase-js";

export class ApiService {
  private client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  async createDeviceSesstion(): Promise<Session> {
    const res = await this.client.request<Session>({
      url: "/auth/anonymous",
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANNON_KEY}`,
      },
    });
    console.debug(res.data);
    return res.data;
  }
}
