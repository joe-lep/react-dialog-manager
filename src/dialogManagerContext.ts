import { createContext } from 'react';
import { REASON_NO_DIALOG_MANAGER_PROVIDER } from './constants';
import { DialogManagerContext } from './types';

const dialogManagerContext = createContext<DialogManagerContext>({
  openDialog: () => Promise.reject(REASON_NO_DIALOG_MANAGER_PROVIDER),
  removeDialog: () => {},
  removeDialogDelayed: () => {},
});

export default dialogManagerContext;
