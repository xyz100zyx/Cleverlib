export interface LoginDto {
    identifier: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface CreateBookingDto{
    data: {
        order: boolean,
        dateOrder: string,
        book: string,
        customer: string
    }
}

export interface EditBookingDto{
    data: {
        order: boolean,
        dateOrder: string,
        book: string,
        customer: string
    }
}
