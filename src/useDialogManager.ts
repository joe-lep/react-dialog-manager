import { useContext } from 'react';
import dialogManagerContext from './dialogManagerContext';

export const useDialogManager = () => {
  const { openDialog } = useContext(dialogManagerContext);

  return { openDialog };
};
