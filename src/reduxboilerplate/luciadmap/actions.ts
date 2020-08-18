import { makeAction } from '../makeAction';
import { AppEvents } from '../events';
import { Map } from '@luciad/ria/view/Map';


export const SetLuciadMap = makeAction<AppEvents.SET_LUCIADMAP, Map | null>(
  AppEvents.SET_LUCIADMAP
);

export const luciadmapActions = {
  SetLuciadMap,
};
