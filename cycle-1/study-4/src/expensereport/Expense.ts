export default abstract class Expense {
    public amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    public abstract isOverages();

    public abstract getName(expense: Expense);

    public abstract isMeal(expense: Expense);
}