import Expense from './Expense';

export class BreakfastExpense extends Expense {
    constructor(amount: number) {
        super(amount);
    }

    public isOverages() {
        return this.amount > 1000;
    }

    public getName() {
        return 'Breakfast';
    }

    public isMeal() {
        return true;
    }
}