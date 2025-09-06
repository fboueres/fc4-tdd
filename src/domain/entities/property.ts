import { DateRange } from "../value_objects/date_range";

export class Property {
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;
    private readonly maxGuests: number;
    private readonly basePricePerNight: number;
    
    constructor(
        id: string,
        name: string, 
        description: string,
        maxGuests: number, 
        basePricePerNight: number
    ) {
        if (!name) {
            throw new Error("O nome é obrigatório.");
        }

        if(maxGuests <= 0) {
            throw new Error("O número máximo de hóspedes deve ser maior que zero.");
        }
        this.id = id;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;
    }

    getId(): string {
        return this.id;
    }
    
    getName(): string {
        return this.name;
    }
    
    getDescription(): string {
        return this.description;
    }
    
    getMaxGuests(): number {
        return this.maxGuests;
    }
    
    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }
    
    validateGuestCount(guestCount: number): void {
        if (guestCount > this.maxGuests) {
            throw new Error(`Número de máximo de hóspedes excedido. Máximo permitido é: ${this.maxGuests}.`);
        }
    };

    calculateTotalPrice(dateRange: DateRange): number {
        const totalNights = dateRange.getTotalNights();
        let totalPrice = totalNights * this.basePricePerNight;

        if (totalNights >= 7) {
            totalPrice *= 0.9;
        }

        return totalPrice;
    };
}