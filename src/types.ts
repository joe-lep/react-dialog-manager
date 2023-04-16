import { ComponentType } from 'react';

export type DialogObject = {
  id: string;
  DialogComponent: ComponentType<any>;
  componentProps?: any;
  unloadDelay?: number;
  delayOpen?: boolean;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
};

export type OpenDialogOptions = {
  componentProps?: any;
  unloadDelay?: number;
  delayOpen?: boolean;
}

export type DialogManagerContext = {
  openDialog: <T = any>(DialogComponent : ComponentType<any>, options?: OpenDialogOptions) => Promise<T>;
  removeDialog: (dialogId: string) => void;
  removeDialogDelayed: (dialogId: string, dialogUnloadDelay?: number) => void;
};

export type DialogControlContext = {
  open: boolean;
  hasContext: boolean;
  dialogClose: () => void;
  dialogSubmit: (value: any) => void;
};
