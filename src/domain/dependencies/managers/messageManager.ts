interface Message {
  title: string;
  body: string;
}

export default interface MessageManager {
  bindTrigger: (trigger: (m: Message) => void) => void;
  showSerieNotFoundMessage: () => void;
}
