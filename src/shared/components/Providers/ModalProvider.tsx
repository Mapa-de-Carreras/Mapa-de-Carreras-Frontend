import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import BotonBase, { BotonBaseProps }  from '@components/Botones/BotonBase';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from '@components/ui/drawer';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import { useIsMobile } from '@components/hooks/use-mobile';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';

export interface ModalOptions {
  title?: string;
  description?: string;
  buttons?: (BotonBaseProps & { autoClose?: boolean })[]; 
  content?: React.ReactNode;
  isLoading?: boolean;
  msg?: string;
}

interface IModalContext {
  isOpen: boolean;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
  modalContent: ModalOptions | null;
}

const initialState = {
  isOpen: false,
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
};

const ModalContext = createContext<IModalContext>(initialState);

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

  const isMobile = useIsMobile();

  const showModal = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  
  const handleActionClick = (onClickFromButton?: () => void, autoClose: boolean = true) => {
    if (onClickFromButton) {
      onClickFromButton();
    }
 
    if (autoClose) {
        hideModal(); 
    }
  };

  function DesktopModal(){
    return(
          <Dialog open={isOpen} onOpenChange={(open) => !open && hideModal()}>
            <DialogContent className='flex-col h-min sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  {modalOptions?.title}
                </DialogTitle>
                
   
                {modalOptions?.description && (
                  <DialogDescription className="text-center mt-2">
                    {modalOptions.description}
                  </DialogDescription>
                )}
              </DialogHeader>


              {modalOptions?.isLoading ? (
                 <ComponenteCarga mensaje={modalOptions?.msg} /> 
                  
              ) : (
  
                 <>
                    {modalOptions?.content && <div className="my-4">{modalOptions.content}</div>}

                    {modalOptions?.buttons && modalOptions.buttons.length > 0 && (
                        <DialogFooter className="flex-row justify-center gap-2 sm:justify-evenly sm:items-center">
                        {modalOptions.buttons.map((buttonProps, index) => (
                            <BotonBase
                            key={index}
                            {...buttonProps} 
                            onClick={() => handleActionClick(buttonProps.onClick, buttonProps.autoClose)}
                            />
                        ))}
                        </DialogFooter>
                    )}
                 </>
              )}
            </DialogContent>
          </Dialog>
    )
  }

  function MovilModal(){
    return(
          <Drawer open={isOpen} onOpenChange={(open) => !open && hideModal()} >
            <DrawerContent className="rounded-t-3xl p-6">
              <DrawerHeader>
                <DrawerTitle className="text-center text-xl font-bold">
                  {modalOptions?.title}
                </DrawerTitle>

                {modalOptions?.description && (
                  <DrawerDescription className="text-center mt-2">
                    {modalOptions.description}
                  </DrawerDescription>
                )}
              </DrawerHeader>

  
               {modalOptions?.isLoading ? (
                    <ComponenteCarga mensaje={modalOptions?.msg} /> 
              ) : (
                 <>
                    {modalOptions?.content && <div className="my-4">{modalOptions.content}</div>}

                    {modalOptions?.buttons && modalOptions.buttons.length > 0 && (
                        <DrawerFooter className="mx-auto mt-4 w-full max-w-sm flex-row gap-2 justify-evenly ">
                        {modalOptions.buttons.map((buttonProps, index) => (
                            <BotonBase
                            key={index}
                            {...buttonProps} 
                            onClick={() => handleActionClick(buttonProps.onClick, buttonProps.autoClose)}
                            />
                        ))}
                        </DrawerFooter>
                    )}
                 </>
              )}
            </DrawerContent>
          </Drawer>
    )
  }


  const contextValue = useMemo(() => ({
    isOpen,
    showModal,
    hideModal,
    modalContent: modalOptions
  }), [isOpen, showModal, hideModal, modalOptions]);

  return (

    <ModalContext.Provider value={contextValue}>
      {children}
      {isMobile ? <MovilModal /> : <DesktopModal />}
    </ModalContext.Provider>
  );
};