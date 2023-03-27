import {FC, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {ProfileHeader} from "./components/profile-header/profile-header";
import styles from './styles.module.scss'
import {ProfileCredentials} from "./components/profile-credentials/profile-credentials";
import {useThunkDispatch} from "../../hooks/redux/dispatchers";
import {getMe} from "../../store/slices/profile/async-actions";
import {useAppSelector} from "../../hooks/redux/selectros";
import {LoaderWindow} from "../../components/popups";
import {profileDataSelector, profileStatusSelector} from "../../store/selectors/profile-selectors";
import {AlertFounders, RequestStatusType} from "../../utils/constants";
import {popupStateSelector} from "../../store/selectors/popup-selectors";
import {AlertPopup} from "../../components/popups/alert-popup/alert-popup";
import {ProfileSection} from "./components/profile-section/profile-section";
import {BlueCard} from "./components/cards/blue-card";
import {BookCardFW} from "../../components/entities";
import {BookCard} from "./components/cards/book-card";
import {RedCard} from "./components/cards/red-card";
import {getDMDate, isDateGreaterThanToday, isDateLessThanToday} from "../../utils/date.utils";
import {SliderBooks} from "../../components/entities/swiper/slider-books/slider-books";
import {setAlertFounder} from "../../store/slices/popup/popup-slice";
import {fetchBooks} from "../../store/slices/books/async-actions";
import {fetchGenres} from "../../store/slices/nav/async-actions";


const books = [
    {
        id: 34,
        title: 'Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо',
        issueYear: '2020',
        authors: ['Максим Дорофеев'],
        image: null,
        rating: 3.6,
    },
    {
        id: 52,
        title: '15 секретов управления временем. Как успешные люди успевают всё',
        issueYear: '2019',
        authors: ['Кевин Круз'],
        image: null,
        rating: 1,
    },
    {
        id: 94,
        title: 'Так говорили мудрецы. Афоризмы',
        issueYear: '2016',
        authors: ['С. Барсов'],
        image: null,
        rating: 1,
    },
    {
        id: 11,
        title: '101 способ раскрутки личного бренда. Как сделать себе имя',
        issueYear: '2019',
        authors: ['Вячеслав Семенчук'],
        image: null,
        rating: 1,
    },
    {
        id: 15,
        title: '101 способ раскрутки личного бренда. Как сделать себе имя',
        issueYear: '2019',
        authors: ['Вячеслав Семенчук'],
        image: null,
        rating: 4,
    },
];

const comments = [
    {
        id: 1,
        rating: 3.4,
        text: 'Suka naxyi blyat pizdec',
        bookId: 94
    },
    {
        id: 12,
        rating: 1,
        text: 'Comment for 11',
        bookId: 11
    },
    {
        id: 13,
        rating: 3.4,
        text: 'Comment for 52',
        bookId: 52
    }
]

export const ProfilePage: FC = () => {

    const isNeedFirstRequest = useRef(true)
    const thunkDispatch = useThunkDispatch();
    const dispatch = useDispatch()
    const profileStatus = useAppSelector(profileStatusSelector);
    const profile = useAppSelector(profileDataSelector);
    const {alert} = useAppSelector(popupStateSelector);
    const currentDate = new Date();
    const isLoading = profileStatus === RequestStatusType.PENDING;
    const isBookedByUser = profile?.booking?.order
    const isDeliveredByUser = profile?.delivery?.handed;
    const isBookingOverdue = currentDate >= new Date(profile?.booking?.dateOrder || '')
    const isDeliveryOverdue = currentDate >= new Date(profile?.delivery?.dateHandedTo || '')
    const isUserHasHistory = profile?.history;

    console.log(isBookingOverdue, ' ', !!isBookingOverdue)

    useEffect(() => {
        dispatch(setAlertFounder(AlertFounders.PROFILE))
        if (isNeedFirstRequest.current) {
            thunkDispatch(getMe())
            thunkDispatch(fetchBooks())
            thunkDispatch(fetchGenres())
        }
        isNeedFirstRequest.current = false
    },)

    return isLoading ? <LoaderWindow/> : (
        <div className={styles.profile}>
            <ProfileHeader firstName={profile?.firstName as string}
                           lastName={profile?.lastName as string}/>
            <ProfileCredentials/>
            <ProfileSection title='Забронированная книга'
                            text='Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь'>
                {isBookedByUser ? <BookCard>
                    <BookCardFW bookInfoProfile={profile?.booking.book} isForProfile={true}/>
                    {isDateLessThanToday(profile?.booking?.dateOrder) && <RedCard text='Дата бронирования книги истекла'
                                                   subtext='Через 24 часа книга будет  доступна всем'/>}
                </BookCard> : <BlueCard text='Забронируйте книгу и она отобразится '/>}
            </ProfileSection>
            <ProfileSection title='Книга которую взяли'
                            text='Здесь можете просмотреть информацию о книге и узнать сроки возврата'>
                {isDeliveredByUser ? <BookCard>
                    <BookCardFW bookInfoProfile={profile?.delivery.book} isForProfile={true}
                                isForProfileData={true}
                                dateReturnBook={`возврат ${getDMDate(profile?.delivery?.dateHandedTo)}`}/>
                    {(!isDateGreaterThanToday(profile?.delivery?.dateHandedTo) && !isDateLessThanToday(profile?.booking?.dateOrder)) && <RedCard text='Вышел срок пользования книги '
                                                   subtext='Верните книгу, пожалуйста'/>}
                </BookCard> : <BlueCard text='Прочитав книгу, она отобразится в истории'/>}
            </ProfileSection>
            <ProfileSection dataTestId='history' title='История' text='Список прочитанных книг'>
                {
                    (isUserHasHistory && profile.history.books) ? <SliderBooks books={profile?.history?.books} comments={comments} /> : <BlueCard text='Вы не читали книг из нашей библиотеки '/>
                }
            </ProfileSection>
            {alert && <AlertPopup dataTestId=''/>}
        </div>
    )
}
