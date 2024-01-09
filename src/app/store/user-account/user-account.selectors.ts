import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAccount } from "./user-account.reducers";


const getUserAccount = createFeatureSelector<UserAccount>('userAcct');

export const selectUserAccount = createSelector(getUserAccount, (state) => {
  console.log('state', state);
  return state;
});


export const selectUserAccounts = createSelector(getUserAccount, (state) => state.accounts);

export const selectUserBudgetPeriods = createSelector(getUserAccount, (state) => state.budgetPeriods);