export const ROUTES = {
  HOME: '/',
  VIEW_POST: (pid: string) => `/p/${pid}`,
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  NEW_POST: '/new',
  USER_PROFILE: (uid: string) => `/u/${uid}`,
};
