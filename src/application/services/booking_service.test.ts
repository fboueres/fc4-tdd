import { Booking } from "../../domain/entities/booking";
import { BookingService } from "./booking_service";
import { CreateBookingDTO } from "../dtos/create_booking_dto";
import { FakeBookingRepository } from "../../infrastructure/repositories/fake_booking_repository";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";

jest.mock("./property_service");
jest.mock("./user_service");

describe("BookingService", () => {
    let bookingService: BookingService;
    let fakeBookingRepository: FakeBookingRepository;
    let mockPropertyService: jest.Mocked<PropertyService>;
    let mockUserService: jest.Mocked<UserService>;

    beforeEach(() => {
        const mockPropertyRepository = {} as any;
        const mockUserRepository = {} as any;

        mockPropertyService = new PropertyService(
            mockPropertyRepository
        ) as jest.Mocked<PropertyService>;

        mockUserService = new UserService(
            mockUserRepository
        ) as jest.Mocked<UserService>;

        fakeBookingRepository = new FakeBookingRepository();
        bookingService = new BookingService(
            fakeBookingRepository,
            mockPropertyService,
            mockUserService
        );
    });
    
    it("deve criar uma reserva com sucesso usando repositório fake", async () => {
        const mockProperty = {
            getId: jest.fn().mockReturnValue("1"),
            isAvailable: jest.fn().mockReturnValue(true),
            validateGuestCount: jest.fn(),
            calculateTotalPrice: jest.fn().mockReturnValue(500),
            addBooking: jest.fn()
        } as any;
        
        const mockUser = {
            getId: jest.fn().mockReturnValue("1"),
        } as any;

        const mockDateRange = {
            getStartDate: jest.fn().mockReturnValue(new Date("2024-12-20")),
            getEndDate: jest.fn().mockReturnValue(new Date("2024-12-25")),
            getTotalNights: jest.fn().mockReturnValue(6),
            overlaps: jest.fn()
        }
        
        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);
        
        const bookingDTO: CreateBookingDTO = {
            propertyId: "1",
            guestId: "1",
            startDate: mockDateRange.getStartDate(),
            endDate: mockDateRange.getEndDate(),
            guestCount: 2
        };

        const result = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.getTotalPrice()).toBe(500);
        expect(result.getStatus()).toBe("CONFIRMED");

        const savedBooking = await fakeBookingRepository.findById(result.getId());
        
        expect(savedBooking).not.toBeNull();
        expect(savedBooking?.getId()).toBe(result.getId());
    });

    it("deve lançar um erro quando a propriedade não for encontrada", async () => {
        mockPropertyService.findPropertyById.mockResolvedValue(null);
        
        const mockDateRange = {
            getStartDate: jest.fn().mockReturnValue(new Date("2024-12-20")),
            getEndDate: jest.fn().mockReturnValue(new Date("2024-12-25")),
            getTotalNights: jest.fn().mockReturnValue(6),
            overlaps: jest.fn()
        }
        const bookingDTO: CreateBookingDTO = {
            propertyId: "1",
            guestId: "1",
            startDate: mockDateRange.getStartDate(),
            endDate: mockDateRange.getEndDate(),
            guestCount: 2
        };

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow(
            "Propriedade não encontrada."
        );
    });

    it("deve lançar um erro quando o usuário não for encontrada", async () => {
        const mockProperty = {
            getId: jest.fn().mockReturnValue("1"),
        } as any;
        
        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(null);
        
        const mockDateRange = {
            getStartDate: jest.fn().mockReturnValue(new Date("2024-12-20")),
            getEndDate: jest.fn().mockReturnValue(new Date("2024-12-25")),
            getTotalNights: jest.fn().mockReturnValue(6),
            overlaps: jest.fn()
        }
        const bookingDTO: CreateBookingDTO = {
            propertyId: "1",
            guestId: "1",
            startDate: mockDateRange.getStartDate(),
            endDate: mockDateRange.getEndDate(),
            guestCount: 2
        };

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow(
            "Usuário não encontrado."
        );
    });
});