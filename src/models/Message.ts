export interface Message {
  id?: number;
  text: string;
  senderId: number;
  receiverId: number;
  createdAt?: Date;
}
