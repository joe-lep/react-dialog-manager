import { DialogPromiseAction, DialogPromiseExecutor } from './types';

type WrappedPromise<T> = Promise<DialogPromiseAction<T>>

export default class DialogManagerPromise<T> {
  constructor(value: DialogPromiseExecutor<DialogPromiseAction<T>> | WrappedPromise<T>) {
    if (value instanceof Promise) {
      this.wrappedPromise = value;
    }
    else {
      this.wrappedPromise = new Promise<DialogPromiseAction<T>>(value);
    }
  }

  wrappedPromise: WrappedPromise<T>;

  onSubmit(callback: (payload: T) => void) {
    return new DialogManagerPromise<T>(
      this.wrappedPromise.then((callbackData: DialogPromiseAction<T>) => {
        if (callbackData.type === 'submit') {
          callback(callbackData.payload);
        }

        return callbackData;
      })
    )
  }

  onClose(callback: () => void) {
    return new DialogManagerPromise<T>(
      this.wrappedPromise.then((callbackData: DialogPromiseAction<T>) => {
        if (callbackData.type === 'close') {
          callback();
        }

        return callbackData;
      })
    )
  }

  then<FulfillType = any>(onfulfilled: ((value: DialogPromiseAction<T>) => FulfillType), onrejected: ((reason: any) => PromiseLike<never>) | null | undefined) {
    return this.wrappedPromise.then<FulfillType>(onfulfilled, onrejected);
  }

  catch(onrejected?: ((reason: any) => any) | null | undefined) {
    return this.wrappedPromise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | null | undefined) {
    return this.wrappedPromise.finally(onfinally)
  }
}
