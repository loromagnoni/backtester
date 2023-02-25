import { useDisclosure } from '@chakra-ui/react';
import { createContext, PropsWithChildren } from 'react';

type DrawerContextType = Pick<
    ReturnType<typeof useDisclosure>,
    'isOpen' | 'onClose' | 'onOpen'
>;
export const DrawerContext = createContext({} as DrawerContextType);

export const DrawerProvider = ({ children }: PropsWithChildren) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </DrawerContext.Provider>
    );
};
