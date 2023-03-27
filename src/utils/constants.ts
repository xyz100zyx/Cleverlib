export const HOST = "https://strapi.cleverland.by"

export enum AuthRequestEndpoints{
    LOGIN = '/api/auth/local',
    REGISTRATION = '/api/auth/local/register',
    FORGOT_PASS = '/api/auth/forgot-password',
    RESET_PASS = '/api/auth/reset-password',
    GET_ME = '/api/users/me',
}

export enum ProfileRequestEndpoints{
    UPLOAD_AVATAR = '/api/upload',
    CHANGE_PROFILE_DATA = '/api/users/'
}

export enum BooksRequestEndpoints{
    FETCH_BOOKS = '/api/books'
}

export enum BookingRequestEndpoints{
    ENDPOINT = '/api/bookings'
}

export enum CategoriesRequestEndpoints{
    ENDPOINT = '/api/categories'
}

export enum CommentsRequestEndpoints{
    ENDPOINT = '/api/comments'
}

export enum ResponseStatusReqType{
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum RequestStatusType{
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

export enum CrudActionTypes{
    EDIT = 'edit',
    CREATE = 'create',
    DELETE = 'delete',
    READ = 'read'
}

export enum AuthRoutesEndpoints{
    LOGIN = 'auth',
    REGISTRATION ='registration',
    FORGOT_PASS = 'forgot-pass',
}

export enum AlertFounders{
    BOOKS = 'books',
    PROFILE = 'profile',
    BOOKING = 'booking',
    COMMENTS = 'comments',
    CATEGORIES = 'categories'
}

export const ABSTRACT_ERROR_TEXT = 'Что-то пошло не так. Обновите страницу через некоторое время.'


