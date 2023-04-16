import React, { ComponentType, ReactNode, useCallback, useMemo, useState } from 'react';
import {v4 as uuidV4 } from 'uuid';
import dialogManagerContext from './dialogManagerContext';
import { DialogObjectWrapper } from './DialogObjectWrapper';
import { DialogObject, OpenDialogOptions } from './types';
import { DEFAULT_UNLOAD_DELAY } from './constants';

type Props = {
  unloadDelay?: number;
  delayOpen?: boolean;
  children: ReactNode;
};

export const DialogManager : React.FC<Props> = ({
  children,
  unloadDelay = DEFAULT_UNLOAD_DELAY,
  delayOpen,
}) => {
  const [dialogStackState, setDialogStackState] = useState<Array<DialogObject>>([]);

  const openDialog = useCallback(<T = any>(DialogComponent : ComponentType<any>, options : OpenDialogOptions = {}) => {
    const dialogPromise = new Promise<T>((resolve: (value: T) => void, reject) => {
      const newDialogObject : DialogObject = {
        id: uuidV4(),
        DialogComponent,
        componentProps: options.componentProps,
        unloadDelay: options.unloadDelay ?? unloadDelay,
        delayOpen: options.delayOpen ?? delayOpen,
        resolve,
        reject,
      };
  
      setDialogStackState(state => [...state, newDialogObject]);
    });

    return dialogPromise;
  }, [setDialogStackState, unloadDelay, delayOpen]);

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
