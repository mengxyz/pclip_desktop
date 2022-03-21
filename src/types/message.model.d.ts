export interface MessageModel {
  id: string;
  expried: string;
  message: string;
  sender: string;
}

export interface MessageRequest {
  room_id: string;
  message: string;
}
