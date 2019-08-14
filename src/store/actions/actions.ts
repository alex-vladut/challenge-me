export interface Action {
  type: string;
}

export interface ActionWithPayload<T> extends Action {
  payload: T
}

interface ActionCreator<T> {
  create(type: string, payload: T): ActionWithPayload<T>;
}

export function payload<T>(): ActionCreator<T> {
  return ({
    create(type: string, payload: T): ActionWithPayload<T> {
      return { type, payload }
    }
  });
}

export function action<T>(type: string, payload: ActionCreator<T>) {
  return {
    type,
    create: (p: T) => payload.create(type, p)
  }
};

export function actionWithoutPayload(type: string) {
  return {
    type,
    create: (): Action => ({ type })
  }
};
