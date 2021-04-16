import Expense from './Expense';

export class CarRentalExpense extends Expense {
    constructor(amount: number) {
        super(amount);
    }

    public isOverages() {
        return false;
    }

    public getName(expense: Expense) {
        return 'Car Rental'
    }

    public isMeal(expense: Expense) {
        return false;
    }
}