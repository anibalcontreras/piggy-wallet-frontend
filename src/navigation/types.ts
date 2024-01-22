export const enum Screen {
  Home = 'HOME_SCREEN',
  Expenses = 'EXPENSES_SCREEN',
  AddExpense = 'ADD_EXPENSES_SCREEN',
}

export type ScreenValue = (typeof Screen)[keyof typeof Screen];
