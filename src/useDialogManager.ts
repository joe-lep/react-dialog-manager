import { useContext, useMemo } from 'react';
import dialogManagerContext from './dialogManagerContext';

export const useDialogManager = () => {
  const dialogManager = useContext(dialogManagerContext);

  return useMemo(() => ({
    openDialog: dialogManager.openDialog,
  }), [dialogManager]);
};
