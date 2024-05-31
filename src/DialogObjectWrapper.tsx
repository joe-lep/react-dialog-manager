import React, { useCallback, useContext, useEffect, useState } from 'react';
import dialogManagerContext from './dialogManagerContext';
import { DialogObject } from './types';
import dialogControlContext from './dialogControlContext';

type Props = {
  dialogObject: DialogObject
}

export const DialogObjectWrapper : React.FC<Props> = ({ dialogObject }) => {
  const {
    id: dialogId,
    DialogComponent,
    componentProps,
    unloadDelay,
    delayOpen,
    resolve,
  } = dialogObject;

  const [open, setOpen] = useState(!delayOpen);

  const { removeDialog, removeDialogDelayed } = useContext(dialogManagerContext);

  useEffect(() => {
    if (delayOpen) {
      setOpen(true);
    }
  }, [delayOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);

    if (unloadDelay) {
      removeDialogDelayed(dialogId, unloadDelay);
    }
    else {
      removeDialog(dialogId);
    }    
  }, [setOpen, removeDialogDelayed, dialogId, unloadDelay]);

  const closeDialog = useCallback(() => {
    handleClose();
    resolve({ type: 'close' });
  }, [handleClose, resolve]);

  const submitDialog = useCallback((value: any) => {
    resolve({ type: 'submit', payload: value });
    handleClose();
  }, [resolve, handleClose]);

  const dialogControlsValue = { open, hasContext: true, closeDialog, submitDialog };

  return (
    <dialogControlContext.Provider value={dialogControlsValue}>
      <DialogComponent {...componentProps} />
    </dialogControlContext.Provider>
  );
};
