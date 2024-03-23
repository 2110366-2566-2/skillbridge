export type toServerMessage = {
  isImage: boolean,
  text: string,
  image: File | undefined,
}

export type toClientMessage = {
  senderId: string,
  timeStamp: Date,
  isImage: boolean,
  content: string,
};
