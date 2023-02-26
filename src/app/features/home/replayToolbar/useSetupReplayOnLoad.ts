import useSetupReplay from 'app/hooks/useSetupReplay';
import { useEffect } from 'react';

export default function useSetupReplayOnLoad() {
  const setupReplay = useSetupReplay();
  useEffect(() => {
    setupReplay();
  }, [setupReplay]);
}
