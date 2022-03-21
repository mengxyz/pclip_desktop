import axios from "axios";
import { Session } from "@supabase/supabase-js";
import { JoinRoomModel } from "../types/join-room.model";

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

  async joinRoom(
    inviteCode: string,
    inviteSecret: string,
    jwt: string
  ): Promise<void> {
    try {
      const res = await this.client.request<JoinRoomModel>({
        url: "/room/join",
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: {
          invite_id: inviteCode,
          secret: inviteSecret,
          device_name: "Mac Intel",
        },
      });
      localStorage.setItem(res.data.room_id, res.data.secret);
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
