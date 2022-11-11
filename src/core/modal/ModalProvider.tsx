import { Modal, useDisclosure } from '@chakra-ui/react';
import { createContext, useState } from 'react';

type ModalContextType = ReturnType<typeof useDisclosure> & {
    openedModal: number | undefined;
    setOpenedModal: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const ModalContext = createContext<ModalContextType>(
    {} as ModalContextType
);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useDisclosure();
    const [openedModal, setOpenedModal] = useState<number | undefined>(
        undefined
    );
    return (
        <ModalContext.Provider
            value={{ ...value, setOpenedModal, openedModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};
