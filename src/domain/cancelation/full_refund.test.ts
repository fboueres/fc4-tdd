import { FullRefund } from "./full_refund";

describe("FullRefund", () => {
    it("deve calcular o reembolso corretamente", () => {
        const refundRule = new FullRefund();
        
        expect(
            refundRule.calculateRefund(100)
        ).toBe(0);
    });
});