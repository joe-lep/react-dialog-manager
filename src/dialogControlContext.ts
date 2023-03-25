import { createContext } from 'react';
import { DialogControlContext } from './types';

const dialogControlContext = createContext<DialogControlContext>({
  dialogSubmit: () => {},
  dialogClose: () => {},
});

export default dialogControlContext;
