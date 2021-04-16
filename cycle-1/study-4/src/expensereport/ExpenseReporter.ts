import Expense from './Expense';
import ReportPrinter from './ReportPrinter';
import {changeToUsdFormat} from './utils/util';
import ExpenseReport from './ExpenseReport';

export default class ExpenseReporter {
    private printer: ReportPrinter;
    private expenseReport: ExpenseReport = new ExpenseReport();

    public printReport(printer: ReportPrinter): void {

        this.printer = printer;

        this.expenseReport.totalsUpExpenses();
        this.printExpensesAndTotals();
    }

    private printExpensesAndTotals() {
        this.printHeader();
        this.printExpenses();
        this.printTotals();
    }

    private printExpenses() {
        for (const expense of this.expenseReport.expenses) {
            this.printer.print(`${expense.isOverages() ? 'X' : ' '}\t${expense.getName(expense)}\t${changeToUsdFormat(expense.amount / 100.0)}\n`);
        }
    }

    private printTotals() {
        this.printer.print(`\nMeal expenses ${changeToUsdFormat(this.expenseReport.mealExpenses / 100.0)}`);
        this.printer.print(`\nTotal ${changeToUsdFormat(this.expenseReport.total / 100.0)}`);
    }

    private printHeader() {
        this.printer.print('Expenses ' + this.getDate() + '\n');
    }

    public addExpense(expense: Expense): void {
        this.expenseReport.expenses.push(expense);
    }

    private getDate(): string {
        return "9/12/2002";
    }
}