export const BASE_URL =
  process.env.EXPO_PUBLIC_ENV === 'prod'
    ? process.env.EXPO_PUBLIC_PROD_API_URL
    : process.env.EXPO_PUBLIC_DEV_API_URL;

export const END_POINT = {
  login: 'auth/login/',
  register: 'auth/register/',
  profile: 'auth/profile/',
  piggies: 'piggies/',
  allUsers: 'piggies/users/',
  usersWithDebts: 'debt/users/',
  userBalance: 'debt/balance/',
  userDebtsHistory: 'debt/unpaid-history/',
  settleDebt: 'debt/toggle-payment/',
  debt: 'debt/',
  budget: 'budget/',
  userExpenseTypes: 'user_expense_type/',
  expensesByCategories: 'expenses/grouped/',
  expenses: 'expenses/',
  categories: 'categories/',
  bankCards: 'bankcard/',
};
