import Expense from './Expense';

export default class ExpenseReport {
    public total: number = 0;
    public mealExpenses: number = 0;
    public expenses: Array<Expense> = [];

    public totalUpExpense(expense: Expense) {
        if (expense.isMeal(expense))
            this.mealExpenses += expense.amount;

        this.total += expense.amount;
    }

    public totalsUpExpenses() {
        for (const expense of this.expenses) {
            this.totalUpExpense(expense);
        }
    }
}