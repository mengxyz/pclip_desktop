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
import { MessageModel, MessageRequest } from "../types/message.model";
import { observeWrapper } from "../utils/realtime-wrapper";
import { MessageEncrypter } from "../utils/message-encrypter";

export class RoomService {
  private client: SupabaseClient;
  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async sendMessage(roomId: string, msg: string, encrypter: MessageEncrypter) {
    const encryptMessage = encrypter.encrypt(msg);
    await this.client.from("room_message").insert(<MessageRequest>{
      message: encryptMessage.toString(),
      room_id: roomId,
    });
  }

  async deleteMessage(messageId: string) {
    await this.client
      .from("room_message")
      .delete({ returning: "minimal" })
      .eq("id", messageId);
  }

  async messageObserver(
    roomId: string,
    encroter: MessageEncrypter,
    callback: (change: Array<MessageModel>) => void
  ) {
    return observeWrapper<MessageModel>(
      this.client.from("room_message").select().eq("room_id", roomId),
      this.client.from(`room_message:room_id=eq.${roomId}`),
      callback,
      (n, old) => n.id === old.id,
      (data) => {
        data.message = encroter.decrypt(data.message);
        return data;
      }
    );
  }
}
