import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
// 1. Importa los props de tu componente (asumo que está en un tipo)
import BotonBase, { BotonBaseProps }  from '@components/Botones/BotonBase'; // Asegúrate de exportar este tipo
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from '@components/ui/drawer';

export interface ModalOptions {
  title: string;
  description: string;
  buttons?: BotonBaseProps[]; 
}

interface IModalContext {
  isOpen: boolean;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
  modalContent: ModalOptions | null;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider');
  }
  return context;
};


interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const showModal = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);


  const handleActionClick = (onClickFromButton?: () => void) => {
    if (onClickFromButton) {
      onClickFromButton();
    }
    hideModal(); 
  };

  return (
    <ModalContext.Provider value={{ isOpen, showModal, hideModal, modalContent: modalOptions }}>
      {children}

      <Drawer open={isOpen} onOpenChange={(open) => !open && hideModal()}>
        <DrawerContent className="rounded-t-3xl p-6">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-bold">
              {modalOptions?.title}
            </DrawerTitle>

            {modalOptions?.description && (
              <DrawerDescription className="text-center">
                {modalOptions.description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          

          {modalOptions?.buttons && modalOptions.buttons.length > 0 && (
            <DrawerFooter className="mx-auto mt-4 w-full max-w-sm">
              {modalOptions.buttons.map((buttonProps, index) => (
                <BotonBase
                  key={index}
                  {...buttonProps} 
                  onClick={() => handleActionClick(buttonProps.onClick)}
                />
              ))}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </ModalContext.Provider>
  );
};

