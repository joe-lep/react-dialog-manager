import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import dialogManagerContext from './dialogManagerContext';
import { DialogObject } from './types';
import dialogControlContext from './dialogControlContext';
import { REASON_DIALOG_CLOSED } from './constants';

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
    reject,
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

  const dialogClose = useCallback(() => {
    handleClose();
    reject(REASON_DIALOG_CLOSED);
  }, [handleClose, reject]);

  const dialogSubmit = useCallback((value: any) => {
    resolve(value);
    handleClose();
  }, [resolve, handleClose]);

  const dialogControlsValue = { open, hasContext: true, dialogClose, dialogSubmit };

  return (
    <dialogControlContext.Provider value={dialogControlsValue}>
      <DialogComponent {...componentProps} />
    </dialogControlContext.Provider>
  );
};
