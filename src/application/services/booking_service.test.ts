import { CreateBookingDTO } from "../dtos/create_booking_dto";

describe("BookingService", () => {
    it("deve criar uma reserva com sucesso usando repositório fake", () => {
        const bookingDTO: CreateBookingDTO = {
            propertyId: "1",
            guestId: "1",
            startDate: new Date("2024-12-20"),
            endDate: new Date("2024-12-25"),
            guestCount: 2
        };

        const result = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.getGuestCount()).toBe(2);
        expect(result.getPropertyId()).toBe("1");
        expect(result.getGuestId()).toBe("1");
        expect(result.getStartDate()).toEqual(new Date("2024-12-20"));
        expect(result.getEndDate()).toEqual(new Date("2024-12-25"));
        expect(result.getTotalPrice()).toBe(500);
        expect(result.getStatus()).toBe("CONFIRMED)");

        const savedBooking = await fakeBookingRepository.findById(result.getId());
        
        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe(result.getId());
    });
});