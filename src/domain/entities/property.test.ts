import { Booking } from './booking';
import { Property } from './property';
import { DateRange} from '../value_objects/date_range';
import { User } from './user';

describe('Property Entity', () => {
    it('deve criar uma instância de Property com todos os atributos', () =>{
        const property = new Property(
            '1',
            'Casa de praia',
            'Uma bela casa na praia.',
            4,
            200
        );

        expect(property.getId()).toBe('1');
        expect(property.getName()).toBe('Casa de praia');
        expect(property.getDescription()).toBe('Uma bela casa na praia.');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it('deve lançar um erro se o ID for vazio', () => {
        expect(() => {
            new Property("", "Casa", "Descrição", 4, 200);
        }).toThrow("O ID é obrigatório.")
    });
    
    it('deve lançar um erro se o nome for vazio', () => {
        expect(() => {
            new Property("1", "", "Descrição", 4, 200);
        }).toThrow('O nome é obrigatório.');
    });
    
    it('deve lançar um erro se a descrição for vazia', () => {
        expect(() => {
            new Property("1", "Casa", "", 4, 200);
        }).toThrow('A descrição é obrigatória.');
    });

    it('deve lançar um erro se o número máximo de hóspedes for zero ou negativo', () => {
        expect(() => {
            new Property("1", "Casa", "Descrição", 0, 200);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero.")
        
        expect(() => {
            new Property("1", "Casa", "Descrição", -1, 200);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero.")
    });

    it('deve lançar um erro se o preço base por noite for zero ou negativo', () => {
        expect(() => {
            new Property("1", "Casa", "Descrição", 5, 0);
        }).toThrow("O preço base por noite deve ser maior que zero.")
        
        expect(() => {
            new Property("1", "Casa", "Descrição", 5, -1);
        }).toThrow("O preço base por noite deve ser maior que zero.")
    });

    it('deve validar o número máximo de hóspedes', () => {
        const property = new Property("1", "Casa de Campo", "Descrição", 5, 150);

        expect(() => {
            property.validateGuestCount(6);
        }).toThrow('Número máximo de hóspedes excedido. Máximo permitido é: 5.');
        
        const property1 = new Property("1", "Casa de Campo", "Descrição", 4, 140);

        expect(() => {
            property1.validateGuestCount(6);
        }).toThrow('Número máximo de hóspedes excedido. Máximo permitido é: 4.');
    });

    it('não deve aplicar desconto para estadias com menores que 7 noites', () => {
        const property = new Property("1", "Apartamento", "Descrição", 5, 100);
        const dateRange = new DateRange(
            new Date('2024-12-10'),
            new Date('2024-12-16')
        );
        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(600);
    });

    it('deve aplicar desconto para estadias de 7 noites ou mais', () => {
        const property = new Property("1", "Apartamento", "Descrição", 5, 100);
        const dateRange = new DateRange(
            new Date('2024-12-10'),
            new Date('2024-12-17')
        );
        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(630);
    });
    
    it('a propriedade deve ser reservada corretamente', () => {
        const property = new Property('1', 'Casa', 'Descrição', 5, 100);
        const user = new User('1', 'Fernando');
        const dateRange = new DateRange(
            new Date('2024-12-10'),
            new Date('2024-12-15'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);
        
        expect(property.getBookings()).toContain(booking);

        const dateRange2 = new DateRange(
            new Date('2024-11-10'),
            new Date('2024-11-15')
        );

        const booking2 = new Booking('1', property, user, dateRange2, 5);
        
        expect(property.getBookings()).toContain(booking2);

        const dateRange3 = new DateRange(
            new Date('2024-10-10'),
            new Date('2024-10-15')
        );

        const booking3 = new Booking('1', property, user, dateRange3, 5);
        
        expect(property.getBookings()).toContain(booking3);
    });

    it('deve verificar disponibilidade da propriedade', () => {
        const user = new User("1", "Maria Silva");
        const property =  new Property('1', 'Apartamento', 'Descrição', 4, 200);
        const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25'),
        );
        const dateRange2 = new DateRange(
            new Date('2024-12-22'),
            new Date('2024-12-27'),
        );

        new Booking("1", property, user, dateRange, 2);

        expect(property.isAvailable(dateRange)).toBe(false);
        expect(property.isAvailable(dateRange2)).toBe(false);
    });
});