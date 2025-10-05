import { PartialRefund } from "./partial_refund";

describe("PartialRefund", () => {
    it("deve retornar o reembolso corretamente", () => {
        const refundRule = new PartialRefund();

        expect(
            refundRule.calculateRefund(100)
        ).toBe(50);
    });
});