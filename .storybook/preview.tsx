import React from 'react';
import type { Preview } from "@storybook/react";
import { ThemeProvider, createTheme, Container } from '@mui/material';

const theme = createTheme({
  components: {
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
      (Story) => {
        return (
        <ThemeProvider theme={theme}>
          <Container>
            <Story />
          </Container>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
