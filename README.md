# React Dialog Manager

Lightweight library to simplify and streamline dialog workflow in React.

## Install

`npm install @joe-lep/react-dialog-manager`

## Usage

```javascript
// ...import statements
import { DialogManager, useDialogManager, useDialogControls } from '@joe-lep/react-dialog-manager';

const DialogWithTextField = () => {
  const { open, closeDialog, submitDialog } = useDialogControls();
  const [fieldValue, setFieldValue] = useState(defaultFieldValue);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <input value={fieldValue} onChange={e => setFieldValue(e.target.value)} />
      <button type="button" onClick={closeDialog}>
        Cancel
      </button>
      <button type="submit" onClick={() => submitDialog(fieldValue)}>
        Submit
      </button>
    </Dialog>
  );
};

const DialogOpener = () => {
  const { openDialog } = useDialogManager();

  const handleClick = () => {
    openDialog(DialogWithTextField)
      .onSubmit((fieldValue) => {
        console.log('Dialog submitted with text input', fieldValue);
      })
      .onClose(() => {
        console.log('Dialog was closed without submitting');
      });
  };

  return (
    <button type="button" onClick={handleClick}>
      Open Dialog
    </button>
  );
};

const App = () => {
  return (
    <DialogManager>
      <DialogOpener />
    </DialogManager>
  );
};
```

The `Dialog` component can be any general dialog or modal React component that accepts a boolean `open` prop (or another prop name that accepts an open/closed status). For example, [Material UI Dialog](https://mui.com/material-ui/react-dialog/).

## Components

### DialogManager

A component that provides context for calling the `useDialogManager` hook. Wrap it around your app or whatever components you wish to be able to use to instance dialogs. Note that all instanced dialogs will be mounted in the `DialogManager` component, so make sure that if there are any other Providers you want to make available to your dialogs, that this component is nested inside of those providers. For example, if you want to make redux state available to your dialogs, make sure `DialogManager` is nested somewhere inside of your react-redux `Provider` component.

#### Props

| Name                 | Type         | Default Value                | Description                           |
|----------------------|--------------|------------------------------|---------------------------------------|
| unloadDelay          | `number`     | 10000                        | The time in milliseconds that all dialog components will remain mounted after being closed. This is used to ensure that any closing animations that the dialog needs to play will have sufficient time to play out before it is removed from the virtual DOM. |
| delayOpen            | `boolean`    | false                        | If set to true, any modal added through the `openModal` function will initially have its `open` property set to `false` before being set to `true`. Use this if the dialog component you are using needs to have its open prop toggle from false to true in order to play its opening animation correctly. Otherwise, this won't be necessary to worry about. |

## Hooks

### `useDialogManager()`

Use this hook in any component that you wish to open dialogs from. It returns an object with the following properties:

#### `openDialog<T = any>(DialogComponent: ComponentType<any>, options?: OpenDialogOptions) => DialogManagerPromise<T>`

- `DialogComponent` - A React component to open as a dialog. For it to work properly, the component must use the `useDialogControls` hook.
- `options?`
  - `componentProps?: any` - Props to pass to the `DialogComponent`.
  - `unloadDelay?: number` - Can override the `unloadDelay` prop of `DialogManager` for the single specific instance of `DialogComponent`.
  - `delayOpen?: boolean` - Can override the `delayOpen` prop of `DialogManager` for the single specific instance of `DialogComponent`.

This function returns a `DialogManagerPromise` that will resolve when the `submitDialog` callback is called from the `DialogComponent` with whatever value is passed to the `submitDialog` call. You can then use `.onSubmit` and `.onClose` the same way you would use `.then` with callbacks that will trigger when the dialog is submitted or closed. The `onSubmit` callback will receive the argument passed to `submitDialog` and the `onClose` callback will accept no arguments. You can also use `.then`, `.catch`, and `.finally`, which will work as normal and return the underlying `Promise`.

### `useDialogControls()`

Use this hook in the dialog component you pass to `openDialog`. This hook is used for managing the open/close status of the dialog instance, as well as submitting the dialog to resolve the promise returned by `openDialog`.

#### `hasContext: boolean`

This will return true if hook was called within a valid `dialogControlContext`, which will only be the case if the component it is used in was instanced through the `openDialog` function, or is nested within such a component. Can be used for debugging or verification purposes.

#### `open: boolean`

A boolean value to control whether the dialog is open or not. Pass to your generic dialog or modal component.

#### `closeDialog() => void`

Call to close the dialog without submitting it, such as if the user clicks outside of the dialog or clicks a cancel button.

#### `submitDialog(value: any) => void`

Call to close the dialog while triggering its submission. Calling this callback will cause the Promise returned by `openDialog` to resolve with whatever is passed to the `value` parameter.
