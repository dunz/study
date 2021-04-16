import Expense from './Expense';

export class DinnerExpense extends Expense {
    constructor(amount: number) {
        super(amount);
    }

    public isOverages() {
        return this.amount > 5000;
    }

    public getName(expense: Expense) {
        return 'Dinner';
    }

    public isMeal(expense: Expense) {
        return true;
    }
}