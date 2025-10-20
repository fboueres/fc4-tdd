import { DataSource } from "typeorm";
import { Booking } from "../../domain/entities/booking";
import { BookingEntity } from "../persistence/entities/booking_entity"; 
import { Property } from "../../domain/entities/property";
import { PropertyEntity } from "../persistence/entities/property_entity"; 
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/entities/user_entity";
import { DateRange } from "../../domain/value_objects/date_range";

describe("TypeORMBookingRepository", () => {
    let dataSource: DataSource;
    let bookingRepository: TypeORMBookingRepository;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [BookingEntity, PropertyEntity, UserEntity],
            synchronize: true,
            logging: false,
        });
        await dataSource.initialize();
        bookingRepository = new TypeORMBookingRepository(
            dataSource.getRepository(BookingEntity),
        );
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it("deve salvar uma reserva com sucesso", async () => {
        const propertyRepository = dataSource.getRepository(PropertyEntity);
        const userRepository = dataSource.getRepository(UserEntity);

        const propertyEntity = propertyRepository.create({
            id: "1",
            name: "Casa na Praia",
            description: "Vista para o mar",
            maxGuests: 6,
            basePricePerNight: 200
        });
        await propertyRepository.save(propertyEntity);

        const userEntity = userRepository.create({
            id: "1",
            name: "Carlos"
        });
        await userRepository.save(userEntity);

        const property = new Property(
            "1",
            "Casa na Praia",
            "Vista para o mar",
            6,
            200
        );
        const user = new User("1", "Carlos");
        const dateRange = new DateRange(
            new Date('2024-12-20'), 
            new Date('2024-12-25')
        );

        const booking = new Booking(
            "1",
            property,
            user,
            dateRange,
            6
        );
        await bookingRepository.save(booking);

        const savedBooking = await bookingRepository.findById("1");

        expect(savedBooking).not.toBeNull();
        expect(savedBooking).toBeInstanceOf(Booking);
        expect(savedBooking?.getId()).toBe(booking.getId());
        expect(savedBooking?.getProperty().getId()).toBe(booking.getProperty().getId());
        expect(savedBooking?.getUser().getId()).toBe(booking.getUser().getId());
        expect(savedBooking?.getDateRange()).toBe(booking.getDateRange());
        expect(savedBooking?.getGuestCount()).toBe(booking.getGuestCount());
    });
});