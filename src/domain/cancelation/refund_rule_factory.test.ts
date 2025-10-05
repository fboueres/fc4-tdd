import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {
    it("deve retornar um reembolso total", () => {
        const refundRule = RefundRuleFactory.getRefundRule(8);

        expect(refundRule).not.toBeNull();
        expect(refundRule).toBeInstanceOf(FullRefund);
    });

    it("deve retornar um reembolso parcial", () => {
        const refundRule = RefundRuleFactory.getRefundRule(7);

        expect(refundRule).not.toBeNull();
        expect(refundRule).toBeInstanceOf(PartialRefund);
    });

    it("deve retornar um sem reembolso", () => {
        const refundRule = RefundRuleFactory.getRefundRule(0);

        expect(refundRule).not.toBeNull();
        expect(refundRule).toBeInstanceOf(NoRefund);
    });
});