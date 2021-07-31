import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from 'store/reducers';

export const store = createStore(rootReducer, composeWithDevTools());
