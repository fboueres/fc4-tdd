import { Property } from './property';

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

    it('deve lançar um erro se o nome for vazio', () => {
        expect(() => {
            new Property ("1", "", "Descrição", 4, 200);
        }).toThrow('O nome é obrigatório.');
    });

    it('deve lançar um erro se o número máximo de hóspedes for zero ou negativo', () => {
        expect(() => {
            new Property("1", "Casa", "Descrição", -1, 200);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero.")
    });

    it('deve validar o número máximo de hóspedes', () => {
        const property = new Property("1", "Casa de Campo", "Descrição", 5, 150);

        expect(() => {
            property.validateGuestCount(6);
        }).toThrow('Número de máximo de hóspedes excedido. Máximo permitido é: 5.');
    });
});