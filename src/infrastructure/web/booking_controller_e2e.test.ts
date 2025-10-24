import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { BookingController } from "../web/booking_controller";
import { TypeORMBookingRepository } from "../repositories/typeorm_booking_repository";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { BookingService } from "../../application/services/booking_service";
import { PropertyService } from "../../application/services/property_service";
import { UserService } from "../../application/services/user_service";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { UserEntity } from "../persistence/entities/user_entity";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let bookingRepository: TypeORMBookingRepository;
let propertyRepository: TypeORMPropertyRepository;
let userRepository: TypeORMUserRepository;
let bookingService: BookingService;
let propertyService: PropertyService;
let userService: UserService;
let bookingController: BookingController

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
    propertyRepository = new TypeORMPropertyRepository(
        dataSource.getRepository(PropertyEntity),
    );
    userRepository = new TypeORMUserRepository(
        dataSource.getRepository(UserEntity),
    );

    propertyService = new PropertyService(propertyRepository);
    userService = new UserService(userRepository);
    bookingService = new BookingService(
        bookingRepository,
        propertyService,
        userService,
    );

    bookingController = new BookingController(bookingService);

    app.post("/bookings", (req, res, next) => {
        bookingController.createBooking(req, res).catch((err) => next(err));
    });

    // app.delete("/bookings/:id", (req, res, next) => {
    //     bookingController.cancelBooking(req, res).catch((err) => next(err));
    // });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("BookingController", () => {
    beforeAll(async () => {
        const bookingRepo = dataSource.getRepository(BookingEntity);
        const propertyRepo = dataSource.getRepository(PropertyEntity);
        const userRepo = dataSource.getRepository(UserEntity);

        await bookingRepo.clear();
        await propertyRepo.clear();
        await userRepo.clear();
        
       await propertyRepo.save({
        id: "1",
        name: "Propriedade de Teste",
        description: "Um lugar incrível para ficar",
        maxGuests: 5,
        basePricePerNight: 100
       });
       await userRepo.save({
        id: "1",
        name: "Usuário de Teste",
       });
    });

    it("deve criar uma reserva com sucesso", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "1",
            guestId: "1",
            startDate: "2024-12-20",
            endDate: "2024-12-26",
            guestCount: 2
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Booking created successfully");
        expect(response.body.booking).toHaveProperty("id");
        expect(response.body.booking).toHaveProperty("totalPrice");
    });

    it("deve retornar 400 ao tentar criar uma reserva com data de início inválida", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "1",
            guestId: "1",
            startDate: "invalid-date",
            endDate: "2024-12-26",
            guestCount: 2
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Data de início ou fim inválida");
    });

    it("deve retornar 400 ao tentar criar uma reserva com data de fim inválida", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "1",
            guestId: "1",
            startDate: "2024-12-26",
            endDate: "invalid-date",
            guestCount: 2
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Data de início ou fim inválida");
    });

    it("deve retornar 400 ao tentar criar uma reserva com número de hóspedes inválidos", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "1",
            guestId: "1",
            startDate: "2024-12-20",
            endDate: "2024-12-25",
            guestCount: 0
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("O número de hóspedes deve ser maior que zero.");
    });

    it("deve retornar 400 ao tentar criar uma reserva com propertyId inválido", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "invalid-propertyId",
            guestId: "1",
            startDate: "2024-12-20",
            endDate: "2024-12-25",
            guestCount: 0
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Propriedade não encontrada.");
    });
    
    it("deve retornar 400 ao tentar criar uma reserva com guestId inválido", async () => {
        const response = await request(app).post("/bookings").send({
            propertyId: "1",
            guestId: "invalid-guestId",
            startDate: "2024-12-20",
            endDate: "2024-12-25",
            guestCount: 0
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Usuário não encontrado.");
    });
});