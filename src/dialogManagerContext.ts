import { createContext } from 'react';
import { REASON_NO_DIALOG_MANAGER_PROVIDER } from './constants';
import { DialogManagerContext } from './types';
import DialogManagerPromise from './DialogManagerPromise';

const dialogManagerContext = createContext<DialogManagerContext>({
  openDialog: () => new DialogManagerPromise((_resolve: any, reject: (reason?: any) => void) => {
    reject(REASON_NO_DIALOG_MANAGER_PROVIDER);
  }),
  removeDialog: () => {},
  removeDialogDelayed: () => {},
});

export default dialogManagerContext;
