import * as ReactRedux from 'react-redux';

import type {AppDispatch, RootState} from './index';

export const useDispatch: () => AppDispatch = ReactRedux.useDispatch;

export const useSelector: ReactRedux.TypedUseSelectorHook<RootState> =
    ReactRedux.useSelector;