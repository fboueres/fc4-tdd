import { DateRange } from "./date_range";

describe('DateRange Value Object', () => {
    it('deve lançar um erro se data a de término for antes da data de início', () => {
        expect(() => {
            new DateRange(new Date("2024-12-25"), new Date("2024-12-20"));
        }).toThrow('A data de término deve ser posterior à data de ínicio.');
    });

    it('deve criar uma instância de DateRange com a datas de início e data de término, e verificar o retorno dessas datas', () => {
        const startDate = new Date("2024-12-20");
        const endDate = new Date("2024-12-25");
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    });

    it('deve calcular o total de noites corretamente', () => {
        const startDate = new Date("2024-12-20");
        const endDate = new Date("2024-12-25");
        const dateRange = new DateRange(startDate, endDate);

        const totalNights = dateRange.getTotalNights();

        expect(totalNights).toBe(5);

        const startDate1 = new Date("2024-12-10");
        const endDate1 = new Date("2024-12-25");
        const dateRange1 = new DateRange(startDate1, endDate1);

        const totalNights1 = dateRange1.getTotalNights();

        expect(totalNights1).toBe(15);
    });
});