import React, { useCallback, useContext, useState } from 'react';
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
    resolve,
    reject,
  } = dialogObject;

  const [open, setOpen] = useState(true);

  const { removeDialogDelayed } = useContext(dialogManagerContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (removeDialogDelayed) {
      removeDialogDelayed(dialogId, unloadDelay);
    }
  }, [setOpen, removeDialogDelayed, dialogId, unloadDelay]);

  const dialogClose = useCallback(() => {
    handleClose();
    reject('closed');
  }, [handleClose, reject]);

  const dialogSubmit = useCallback((value: any) => {
    resolve(value);
    handleClose();
  }, [resolve, handleClose]);

  return (
    <dialogControlContext.Provider value={{dialogClose, dialogSubmit}}>
      <DialogComponent open={open} onClose={dialogClose} {...componentProps} />
    </dialogControlContext.Provider>
  );
};
