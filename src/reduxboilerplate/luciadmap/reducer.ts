import { AppEvents } from '../events';
import { Actions } from '../actions';
import { Map } from '@luciad/ria/view/Map';

export interface MapReduxState {
  map: Map | null;
}

const initState: MapReduxState = {
  map: null,
};

export const mapReducer = (
  state: MapReduxState = initState,
  action: Actions
): MapReduxState => {
  switch (action.type) {
    case AppEvents.SET_LUCIADMAP:
      return { ...state, map: action.payload };
    default:
      return state;
  }
};
