import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import useDependencies from 'app/dependencies/useDependencies';

export default function ToastRoot() {
  const { messageManager } = useDependencies();
  const toast = useToast();

  useEffect(() => {
    messageManager.bindTrigger((message) => {
      toast({
        title: message.title,
        description: message.body,
        status: 'error',
        duration: 5000,
      });
    });
  }, [messageManager, toast]);
  return null;
}
