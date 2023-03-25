import { ComponentType } from 'react';

export type DialogObject = {
  id: string;
  DialogComponent: ComponentType<any>;
  componentProps?: any;
  unloadDelay?: number;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
};

export type DialogManagerContext = {
  openDialog: <T = any>(DialogComponent : ComponentType<any>, options?: any) => Promise<T>;
  removeDialog: (dialogId: string) => void;
  removeDialogDelayed: (dialogId: string, dialogUnloadDelay?: number) => void;
};

export type DialogControlContext = {
  dialogClose: () => void;
  dialogSubmit: (value: any) => void;
};
