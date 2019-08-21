import { ActionWithPayload } from "../actions/actions";
import { Create, Clear } from "../actions/notifications.actions";

export interface State {
  item: any;
}

const initialState: State = {
  item: null
};

const reducer = (state = initialState, { type, payload }: ActionWithPayload<any>) => {
  switch (type) {
    case Create.type:
      return { ...state, item: payload };
    case Clear.type:
      return { ...initialState };
  }
  return state;
};

export default reducer;
