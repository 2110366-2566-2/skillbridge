export type toServerTextMessage = {
  text: string
}

export type toServerImageMessage = {
  type: string,
  size: number,
  buffer: Buffer
}

export type toClientMessage = {
  id: string;
  userId: string;
  createdAt: Date;
  content: string;
  isImage: boolean;
};
