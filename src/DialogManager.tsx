import React, { ComponentType, ReactNode, useCallback, useMemo, useState } from 'react';
import {v4 as uuidV4 } from 'uuid';
import dialogManagerContext from './dialogManagerContext';
import { DialogObjectWrapper } from './DialogObjectWrapper';
import { DialogObject } from './types';

type Props = {
  unloadDelay?: number;
  children: ReactNode;
};

export const DialogManager : React.FC<Props> = ({ children, unloadDelay = 10000 }) => {
  const [dialogStackState, setDialogStackState] = useState<Array<DialogObject>>([]);

  const openDialog = useCallback(<T = any>(DialogComponent : ComponentType<any>, options : any = {}) => {
    const dialogPromise = new Promise<T>((resolve: (value: T) => void, reject) => {
      const newDialogObject : DialogObject = {
        id: uuidV4(),
        DialogComponent,
        componentProps: options.componentProps,
        unloadDelay: options.unloadDelay ?? unloadDelay,
        resolve,
        reject,
      };
  
      setDialogStackState(state => [...state, newDialogObject]);
    });

    return dialogPromise;
  }, [setDialogStackState, unloadDelay]);

  const removeDialog = useCallback((dialogId: string) => {
    setDialogStackState(state => state.filter(item => item.id !== dialogId));
  }, [setDialogStackState]);

  const removeDialogDelayed = useCallback((dialogId: string, dialogUnloadDelay = 0) => {
    setInterval(removeDialog, dialogUnloadDelay, dialogId);
  }, [removeDialog]);

  const renderedDialogStack = useMemo(() => {
    return dialogStackState.map(item => (
      <DialogObjectWrapper
        key={item.id}
        dialogObject={item}
      />
    ));
  }, [dialogStackState]);

  return (
    <dialogManagerContext.Provider value={{openDialog, removeDialog, removeDialogDelayed}}>
      {children}
      {renderedDialogStack}
    </dialogManagerContext.Provider>
  );
};
