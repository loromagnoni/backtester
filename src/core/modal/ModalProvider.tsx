import { useDisclosure } from '@chakra-ui/react';
import { createContext } from 'react';

type ModalContextType = ReturnType<typeof useDisclosure>;

export const ModalContext = createContext<ModalContextType>(
    {} as ModalContextType
);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useDisclosure();
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
};
