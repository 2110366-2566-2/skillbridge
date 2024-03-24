export type toServerTextMessage = {
  text: string
}

export type toServerImageMessage = {
  type: string,
  size: number,
  buffer: Buffer
}

export type toClientMessage = {
  senderId: string,
  timeStamp: Date,
  isImage: boolean,
  content: string,
};
