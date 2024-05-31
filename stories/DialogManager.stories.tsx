import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';

import { DialogManager } from '../src/DialogManager';
import { useDialogControls } from '../src/useDialogControls';
import { useDialogManager } from '../src/useDialogManager';

const meta = {
  title: 'ReactDialogManager/Example',
  component: DialogManager,
  argTypes: {
    unloadDelay: {
      control: {
        type: 'number',
        min: 0,
        max: 30000,
        step: 1000,
      },
    },
    delayOpen: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof DialogManager>;

export default meta;

type Story = StoryObj<typeof meta>;

const submitDialogAction = action('submit-dialog');
const closeDialogAction = action('close-dialog');
const errorReportedAction = action('error-reported');

const SimpleDialog = () => {
  const { open, closeDialog, submitDialog } = useDialogControls();

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Simple Test Dialog</DialogTitle>
      <DialogContent>
        <Typography>Simple Test Dialog</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={submitDialog}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const OpenSimpleDialogButton = () => {
  const { openDialog } = useDialogManager();

  const handleClick = useCallback(() => {
    openDialog(SimpleDialog)
      .onSubmit(submitDialogAction)
      .onClose(closeDialogAction);
  }, [openDialog]);

  return (
    <Button variant="contained" onClick={handleClick}>
      Open Simple Dialog
    </Button>
  );
}

export const SimpleDialogExample : Story = {
  args: {
    children: (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OpenSimpleDialogButton />
        </Grid>
      </Grid>
    )
  },
};

const TextDialog = ({ defaultFieldValue = '' }) => {
  const { open, closeDialog, submitDialog } = useDialogControls();
  const [fieldValue, setFieldValue] = useState(defaultFieldValue);

  const handleFieldChange = useCallback((event: any) => {
    if (typeof event?.target?.value == 'string') {
      setFieldValue(event.target.value);
    }
  }, [setFieldValue]);

  const handleSubmit = useCallback(() => {
    submitDialog(fieldValue);
  }, [fieldValue, submitDialog]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Dialog With Form Element(s)</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={fieldValue}
              onChange={handleFieldChange}
              label="New Button Label"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TextDialogButton = () => {
  const { openDialog } = useDialogManager();
  const [label, setLabel] = useState('');

  const handleClick = useCallback(() => {
    openDialog<string>(TextDialog, { componentProps: { defaultFieldValue: label }})
      .onSubmit((result) => {
        if (!(/^[a-zA-Z0-9-_ ]+$/).test(result)) {
          throw 'Bad Data';
        }
        submitDialogAction(result);
        setLabel(result);
      })
      .onClose(closeDialogAction)
      .catch(errorReportedAction);
  }, [openDialog, label, setLabel]);

  return (
    <Button onClick={handleClick} variant="contained" sx={{ textTransform: 'none' }}>
      {label || 'Click to change label'}
    </Button>
  );
};

export const DialogWithSubmission : Story = {
  args: {
    children: (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextDialogButton />
        </Grid>
      </Grid>
    ),
  },
};
