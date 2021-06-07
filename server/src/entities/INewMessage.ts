export interface INewMessagePayload {
  chatId: string;
  content: string; // limitation of Redis payload serialization
  sentAt:Date;
  from?: string;
}
