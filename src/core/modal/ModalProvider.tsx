import { useDisclosure } from '@chakra-ui/react';
import { createContext, useMemo, useState } from 'react';

type ModalContextType = ReturnType<typeof useDisclosure> & {
  openedModal: number | undefined;
  setOpenedModal: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const disclosure = useDisclosure();
  const [openedModal, setOpenedModal] = useState<number | undefined>(undefined);
  const value = useMemo(
    () => ({ ...disclosure, setOpenedModal, openedModal }),
    [disclosure, openedModal]
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
