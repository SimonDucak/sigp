import store from "@/store";

export enum RouteName {
  ROOT = 'Root',
  LOG_IN = 'LogIn',
  DRAW = 'Draw',
}

export enum RouteMiddleware {
  REQUIRED_USER = 'requiredUser',
  REQUIRED_GUEST = 'requiredGuest',
}

export const MiddlewareImplementation = {
  [RouteMiddleware.REQUIRED_USER]: () => !!store.getters.currentUserID,
  [RouteMiddleware.REQUIRED_GUEST]: () => !store.getters.currentUserID,
};

export const MiddlewareNegativeResolution = {
  [RouteMiddleware.REQUIRED_USER]: () => ({ name: RouteName.LOG_IN }),
  [RouteMiddleware.REQUIRED_GUEST]: () => ({ name: RouteName.DRAW }),
};
