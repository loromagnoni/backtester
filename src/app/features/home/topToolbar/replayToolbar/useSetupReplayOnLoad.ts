import useSetupReplay from 'app/domain/replay/useSetupReplay';
import { useEffect } from 'react';

export default function useSetupReplayOnLoad() {
  const setupReplay = useSetupReplay();
  useEffect(() => {
    setupReplay();
  }, [setupReplay]);
}
