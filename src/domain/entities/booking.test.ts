import { Booking } from "./booking";
import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

describe("Booking Entity", () => {
    it('deve criar uma instância de Booking com todos os atributos', () => {
        const property = new Property('1', 'Casa', 'Descrição', 4, 100);
        const user = new User("1", "João Silva");
        const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );
        
        const booking = new Booking('1', property, user, dateRange, 2);

        expect(booking.getId()).toBe("1");
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
        expect(booking.getGuestCount()).toBe(2);
    });
});