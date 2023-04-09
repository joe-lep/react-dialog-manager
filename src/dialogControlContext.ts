import { createContext } from 'react';
import { DialogControlContext } from './types';

const dialogControlContext = createContext<DialogControlContext>({
  open: false,
  hasContext: false,
  dialogSubmit: () => {},
  dialogClose: () => {},
});

export default dialogControlContext;
