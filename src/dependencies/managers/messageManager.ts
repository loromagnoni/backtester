import MessageManager from 'domain/dependencies/managers/messageManager';

let trigger: CallableFunction | undefined;

export default function messageManager(): MessageManager {
  return {
    bindTrigger(fn) {
      trigger = fn;
    },
    showSerieNotFoundMessage() {
      if (!trigger) throw new Error('Message trigger not set!');
      trigger({
        title: 'Data not available',
        body: 'There is no data for the asset you requested in the current date. We are working hard to provide it soon!',
      });
    },
  };
}
