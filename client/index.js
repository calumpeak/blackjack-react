'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import eventPlugin from 'react-tap-event-plugin';

// app
import store from './store';
import App from './app';

// For Interaction
eventPlugin();

render(
    <Provider store = {store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('blackjack')
);
