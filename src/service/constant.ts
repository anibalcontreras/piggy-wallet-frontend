export const BASE_URL =
  process.env.EXPO_PUBLIC_ENV === 'prod'
    ? process.env.EXPO_PUBLIC_PROD_API_URL
    : process.env.EXPO_PUBLIC_DEV_API_URL;

export const END_POINT = {
  login: 'auth/login/',
  register: 'auth/register/',
  profile: 'profile/',
  piggies: 'piggies/',
  allUsers: 'users/',
  usersWithDebts: 'usersWithDebts/',
};
