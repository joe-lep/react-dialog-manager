import { createContext } from 'react';
import { DialogManagerContext } from './types';

const dialogManagerContext = createContext<DialogManagerContext>({
  openDialog: () => Promise.reject('nocontext'),
  removeDialog: () => {},
  removeDialogDelayed: () => {},
});

export default dialogManagerContext;
