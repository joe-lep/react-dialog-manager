import { useContext } from 'react';
import dialogControlContext from './dialogControlContext';

export const useDialogControls = () => {
  const { dialogClose, dialogSubmit } = useContext(dialogControlContext);

  return { dialogClose, dialogSubmit };
};
