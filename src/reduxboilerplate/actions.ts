import { InterfaceActionUnion } from './makeAction';
import { luciadmapActions } from './luciadmap/actions';

const actions = {
  ...luciadmapActions,
};

export type Actions = InterfaceActionUnion<typeof actions>;
