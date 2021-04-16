import MockReportPrinter from './MockReportPrinter';
import {Type} from '../src/expensereport/enum/Type';
import {changeToUsdFormat} from '../src/expensereport/utils/util';
import ExpenseReporter from '../src/expensereport/ExpenseReporter';
import {DinnerExpense} from '../src/expensereport/DinnerExpense';
import {BreakfastExpense} from '../src/expensereport/BreakfastExpense';
import {CarRentalExpense} from '../src/expensereport/CarRentalExpense';

describe("Tdd Test ExpenseReporter", () => {
    let report: ExpenseReporter = new ExpenseReporter();
    let printer: MockReportPrinter = new MockReportPrinter();

    beforeEach(() => {
        report = new ExpenseReporter();
        printer = new MockReportPrinter();
    });


    it("printEmpty", () => {
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(0.00) + "\n" +
            "Total " + changeToUsdFormat(0.00)
        ).toEqual(printer.getText());
    });

    it("printOneDinner", () => {
        report.addExpense(new DinnerExpense(1678));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(16.78) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(16.78) + "\n" +
            "Total " + changeToUsdFormat(16.78)
        ).toEqual(printer.getText());
    });

    it("twoMeals", () => {
        report.addExpense(new DinnerExpense(1000));
        report.addExpense(new BreakfastExpense(500));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(10.00) + "\n" +
            " \tBreakfast\t" + changeToUsdFormat(5.00) + "\n" +

            "\n" +
            "Meal expenses " + changeToUsdFormat(15.00) + "\n" +
            "Total " + changeToUsdFormat(15.00)
        ).toEqual(printer.getText());
    });

    it("twoMealsAndCarRental", () => {
        report.addExpense(new DinnerExpense(1000));
        report.addExpense(new BreakfastExpense(500));
        report.addExpense(new CarRentalExpense(50000));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tDinner\t" + changeToUsdFormat(10.00) + "\n" +
            " \tBreakfast\t" + changeToUsdFormat(5.00) + "\n" +
            " \tCar Rental\t" + changeToUsdFormat(500.00) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(15.00) + "\n" +
            "Total " + changeToUsdFormat(515.00)
        ).toEqual(printer.getText());
    });

    it("overages", () => {
        report.addExpense(new BreakfastExpense(1000));
        report.addExpense(new BreakfastExpense(1001));
        report.addExpense(new DinnerExpense(5000));
        report.addExpense(new DinnerExpense(5001));
        report.printReport(printer);

        expect(
            "Expenses 9/12/2002\n" +
            " \tBreakfast\t" + changeToUsdFormat(10.00) + "\n" +
            "X\tBreakfast\t" + changeToUsdFormat(10.01) + "\n" +
            " \tDinner\t" + changeToUsdFormat(50.00) + "\n" +
            "X\tDinner\t" + changeToUsdFormat(50.01) + "\n" +
            "\n" +
            "Meal expenses " + changeToUsdFormat(120.02) + "\n" +
            "Total " + changeToUsdFormat(120.02)
        ).toEqual(printer.getText());
    });

});