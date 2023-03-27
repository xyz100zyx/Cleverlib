import {RequestStatusType} from "./constants";

export type RequestStatus = 'pending' | 'rejected' | 'fulfilled' | null
export type RequestType = 'edit' | 'create' | 'delete' | null
export type AlertType = 'error' | 'success'
export const getTextAlert = (bookStatus: RequestStatus, commentStatus: RequestStatus, bookingStatus: RequestStatus, bookingRequestType: RequestType) => {
    if(bookStatus==='fulfilled' && commentStatus === 'fulfilled'){
        return 'Спасибо, что нашли время оценить книгу!'
    }
    if(
        (bookStatus === 'rejected' && commentStatus === 'fulfilled')
        || (bookStatus === 'fulfilled' && commentStatus === 'rejected')
        || (commentStatus === 'rejected' && bookStatus === 'rejected')
    ){
        return 'Оценка не была отправлена. Попробуйте позже!'
    }
    if(bookStatus === 'fulfilled' && bookingStatus === 'fulfilled'){
        if(bookingRequestType === 'create'){
            return 'Книга забронирована. Подробности можно посмотреть на странице Профиль'
        }
        if(bookingRequestType === 'edit'){
            return 'Изменения успешно сохранены!'
        }
        if(bookingRequestType === 'delete'){
            return 'Бронирование книги успешно отменено!'
        }
    }
    if(
        (bookStatus === 'rejected' && bookingStatus === 'fulfilled')
        || (bookStatus === 'fulfilled' && bookingStatus === 'rejected')
        || (bookingStatus === 'rejected' && bookStatus === 'rejected')
    ){
        if(bookingRequestType === 'create'){
            return 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
        }
        if(bookingRequestType === 'edit'){
            return 'Изменения не были сохранены. Попробуйте позже!'
        }
        if(bookingRequestType === 'delete'){
            return 'Не удалось снять бронирование книги. Попробуйте позже!'
        }
    }
    return ''
}

export const getAlertType = (statusBlock: {bookStatus?: RequestStatus, commentStatus?: RequestStatus, bookingStatus?: RequestStatus, profileStatus?: RequestStatus, booksStatus?: RequestStatus}): AlertType => {
    if(statusBlock.bookStatus === 'fulfilled' && statusBlock.commentStatus==='fulfilled') return 'success';
    if(statusBlock.bookStatus === 'fulfilled' && statusBlock.bookingStatus==='fulfilled') return 'success';
    if(statusBlock.booksStatus === 'fulfilled' && statusBlock.commentStatus==='fulfilled') return 'success';
    if(statusBlock.booksStatus === 'fulfilled' && statusBlock.bookingStatus==='fulfilled') return 'success';
    if(statusBlock.profileStatus === 'fulfilled') return 'success'
    return 'error';
}

export const getAlertText = (statusBlock: {bookStatus?: RequestStatus, commentStatus?: RequestStatus, bookingStatus?: RequestStatus, bookingRequestType?: RequestType, booksStatus?: RequestStatus, profileStatus?: RequestStatus}) => {
    if(statusBlock.profileStatus === RequestStatusType.FULFILLED){
        return 'Изменения успешно сохранены!'
    }
    if(statusBlock.profileStatus === RequestStatusType.REJECTED){
        return 'Изменения не были сохранены. Попробуйте позже!'
    }
    return ''
}
