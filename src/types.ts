import { ComponentType } from 'react';
import DialogManagerPromise from './DialogManagerPromise';

export type DialogObject = {
  id: string;
  DialogComponent: ComponentType<any>;
  componentProps?: any;
  unloadDelay?: number;
  delayOpen?: boolean;
  resolve: (value: DialogPromiseAction<any>) => void;
  reject: (reason: any) => void;
};

export type OpenDialogOptions = {
  componentProps?: any;
  unloadDelay?: number;
  delayOpen?: boolean;
}

export type DialogManagerContext = {
  openDialog: <T = any>(DialogComponent : ComponentType<any>, options?: OpenDialogOptions) => DialogManagerPromise<T>;
  removeDialog: (dialogId: string) => void;
  removeDialogDelayed: (dialogId: string, dialogUnloadDelay?: number) => void;
};

export type DialogControlContext = {
  open: boolean;
  hasContext: boolean;
  closeDialog: () => void;
  submitDialog: (value: any) => void;
};

export type DialogPromiseAction<T> = {type: 'submit', payload: T} | {type: 'close'};
export type DialogPromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type DialogPromiseExecutor<T> = (resolve: DialogPromiseResolve<T>, reject: (reason?: any) => void) => void;
