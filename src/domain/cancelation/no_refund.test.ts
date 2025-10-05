import { NoRefund } from "./no_refund";

describe("NoRefund", () => {
    it("deve calcular o reembolso corretamente", () => {
        const refundRule = new NoRefund();

        expect(
            refundRule.calculateRefund(100)
        ).toBe(100);
    });
});