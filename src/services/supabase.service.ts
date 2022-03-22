import {
  ApiError,
  RealtimeSubscription,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { STORAGE_KEY } from "@supabase/gotrue-js/src/lib/constants";
import { useAuthStore } from "../store/authStore";
import { RoomModel } from "../types/room.model";
import { MessageModel } from "../types/message.model";
import { observeWrapper } from "../utils/realtime-wrapper";

export class SupabaseServices {
  private client: SupabaseClient;
  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async signInWithGithub() {
    const { user, session, error } = await this.client.auth.signIn({
      provider: "github",
    });
    console.log(user);
    console.log(session);
    console.log(error);
  }

  async signInEmailPassword(
    email: string,
    password: string
  ): Promise<ApiError | null> {
    const { user, session, error } = await this.client.auth.signIn({
      email: email,
      password: password,
    });
    return error;
  }

  async signUp(email: string, password: string): Promise<ApiError | null> {
    const { user, session, error } = await this.client.auth.signUp({
      email: email,
      password: password,
    });
    return error;
  }

  /**
   *
   * @returns true if anon signout
   */
  async singOut(): Promise<boolean> {
    if (
      this.client.auth
        .user()
        ?.email?.endsWith(import.meta.env.VITE_ANON_DOMAIN) == true
    ) {
      localStorage.removeItem(STORAGE_KEY);
      useAuthStore().authrized = false;
      useAuthStore().isAnon = false;
      return true;
    }
    await this.client.auth.signOut();
    return false;
  }

  async setSession(session: Session): Promise<Session> {
    const result = await this.client.auth.setSession(session.refresh_token!);
    return result.session!;
  }

  async getRooms(): Promise<Array<RoomModel>> {
    const result = await this.client.from("room").select();
    return result.data?.map((e) => e as RoomModel) ?? [];
  }

  async getRoom(id: String): Promise<RoomModel> {
    const reslut = await this.client
      .from("room")
      .select()
      .eq("id", id)
      .single();
    return reslut.data as RoomModel;
  }

  async observeRooms(
    callback: (change: Array<RoomModel>) => void
  ): Promise<RealtimeSubscription> {
    return observeWrapper<RoomModel>(
      this.client.from("room").select(),
      this.client.from("room"),
      callback,
      (n, old) => n.id === old.id
    );
  }

  user(): User | null {
    return this.client.auth.user();
  }

  isAnon(): boolean {
    return (
      this.user()?.email?.endsWith(import.meta.env.VITE_ANON_DOMAIN) == true
    );
  }

  accessToken(): string | undefined {
    return this.client.auth.session()?.access_token;
  }
}
