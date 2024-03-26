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
  createdAt: string;
  content: string;
  isImage: boolean;
};
