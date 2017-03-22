'use strict';

import { createStore } from 'redux';
import rootReducer from 'ducks';

const store = createStore(rootReducer);

// For Dev
window.s = () => console.log(store.getState());

export default store;
