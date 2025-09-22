import { Booking } from "../../domain/entities/booking";
import { Property } from "../../domain/entities/property";
import { User } from "../../domain/entities/user";
import { DateRange } from "../../domain/value_objects/date_range";
import { FakeBookingRepository } from "./fake_booking_repository";

describe("FakeBookingRepository", () => {
    it("deve salvar um booking e retorná-lo com sucesso", async () => {
        const property = new Property(
            "1",
            "Apartamento",
            "Apartamento na Cohama",
            10,
            100
        );
        const user = new User(
            "1",
            "João Pessoa"
        ); 
        const booking = new Booking(
            "1",
            property,
            user,
            new DateRange(
                new Date("2024-12-20"),
                new Date("2024-12-25")
            ),
            5
        );
        const fakeBookingRepository = new FakeBookingRepository();

        await fakeBookingRepository.save(booking);
        const savedBooking = await fakeBookingRepository.findById("1");

        expect(savedBooking).not.toBeNull();
        expect(savedBooking).toBeInstanceOf(Booking);
    });
});