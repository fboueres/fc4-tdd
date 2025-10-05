import { Booking } from "../../domain/entities/booking";
import { FakeBookingRepository } from "./fake_booking_repository";

describe("FakeBookingRepository", () => {
    it("deve salvar um booking e retorná-lo com sucesso", async () => {
        const mockProperty = {
            validateGuestCount: jest.fn(),
            addBooking: jest.fn(),
            isAvailable: jest.fn().mockReturnValue(true),
            calculateTotalPrice: jest.fn().mockReturnValue(600),
        } as any;
        const mockUser = {} as any;
        const mockDateRange = {
            getStartDate: jest.fn().mockReturnValue( new Date("2024-12-20")),
            getEndDate: jest.fn().mockReturnValue( new Date("2024-12-25")),
        } as any;
        const booking = new Booking(
            "1",
            mockProperty,
            mockUser,
            mockDateRange,
            5
        );
        const fakeBookingRepository = new FakeBookingRepository();

        await fakeBookingRepository.save(booking);
        const savedBooking = await fakeBookingRepository.findById("1");

        expect(savedBooking).not.toBeNull();
        expect(savedBooking).toBeInstanceOf(Booking);
    });
});