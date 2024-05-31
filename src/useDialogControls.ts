import { useContext } from 'react';
import dialogControlContext from './dialogControlContext';

export const useDialogControls = () => {
  return useContext(dialogControlContext);
};
