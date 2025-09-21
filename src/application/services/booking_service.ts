import type { Booking } from "../../domain/entities/booking";
import type { CreateBookingDTO } from "../dtos/create_booking_dto";

export class BookingService {
    async createBooking(dto: CreateBookingDTO): Promise<Booking> {
        
    }
}