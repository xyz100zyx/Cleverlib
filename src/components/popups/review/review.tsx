import {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { createPortal } from "react-dom";
import {useLocation} from "react-router-dom";
import styles from './review.module.scss'
import {ReactComponent as CloseIcon} from '../../../assets/close-review-icon.svg';
import iconStarFill from '../../../assets/star-icon.svg';
import iconStarUnfill from '../../../assets/star-icon-unfill.svg';
import {BluredWrapper} from "../../common";
import {useThunkDispatch} from "../../../hooks/redux/dispatchers";
import {createComment} from "../../../store/slices/comments/async-actions";
import {fetchBookById} from "../../../store/slices/books/async-actions";
import {
    setAlertFounder,
    setAlertOpen, setIsReviewedByUser,
    setOpenReviewPopup
} from "../../../store/slices/popup/popup-slice";
import {useAppSelector} from "../../../hooks/redux/selectros";
import {IReviewPopup} from "./interface";
import {Profile} from "../../../types/data.types";
import {profileDataSelector} from "../../../store/selectors/profile-selectors";
import {AlertFounders} from "../../../utils/constants";
import {
    createCommentAndUpdate,
    editCommentAndUpdate
} from "../../../store/slices/profile/async-actions";
import {getLocalStorageItem} from "../../../utils/storage.utils";
import {isReviewedByUserSelector} from "../../../store/selectors/popup-selectors";

export const ReviewPopup: FC<IReviewPopup> = ({setVisiblePopup, id, isReviewedByUser = false, commentId}) => {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(isReviewedByUser ? 5 : 0);
    const location = useLocation()
    const user = useAppSelector(profileDataSelector) as Profile;
    const isReviewed = useAppSelector(isReviewedByUserSelector)
    const thunkDispatch = useThunkDispatch()
    const dispatch = useDispatch()
    const userId = user.id || Number(getLocalStorageItem('userId'));

    const onSendButtonClick = () => {
        setVisiblePopup(false);
        dispatch(setOpenReviewPopup(false))
        dispatch(setAlertFounder(AlertFounders.COMMENTS))
        if(location.pathname.slice(1) !== 'profile' && (!isReviewedByUser && !isReviewed)){
            thunkDispatch(createComment({data: {user: userId!, rating, text, book: String(id)}}))
                .then(() => thunkDispatch(fetchBookById(id)))
                .then(() => dispatch(setAlertOpen(true)))
        }
        if(location.pathname.slice(1) !== 'profile' && (isReviewedByUser || isReviewed)){
            dispatch(setAlertFounder(AlertFounders.PROFILE))
            thunkDispatch(editCommentAndUpdate({dto: {data: {user: userId, rating, text, book: String(id)}}, commentId: commentId as number}))
                .then(() => dispatch(setAlertOpen(true)))
        }
        if(location.pathname.slice(1) === 'profile' && isReviewedByUser){
            dispatch(setAlertFounder(AlertFounders.PROFILE))
            thunkDispatch(editCommentAndUpdate({dto: {data: {user: userId, rating, text, book: String(id)}}, commentId: commentId as number}))
                .then(() => dispatch(setAlertOpen(true)))
        }
        if(location.pathname.slice(1) === 'profile' && !isReviewedByUser){
            dispatch(setAlertFounder(AlertFounders.PROFILE))
            thunkDispatch(createCommentAndUpdate({data: {user: userId, rating, text, book: String(id)}}))
                .then(() => dispatch(setAlertOpen(true)))
        }
        dispatch(setIsReviewedByUser(false))

    }

    const onCloseButtonClick = () => {
        setVisiblePopup(false)
        dispatch(setOpenReviewPopup(false))
        dispatch(setIsReviewedByUser(false))
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {document.body.style.overflow = 'visible'}
    }, [])

    return createPortal((
        <BluredWrapper dataTestId='modal-outer' setVisiblePopup={setVisiblePopup}>
            <div data-test-id='modal-rate-book' role='presentation' onClick={e => e.stopPropagation()} className={styles.review}>
                <div className={styles.review__header}>
                    <p data-test-id='modal-title' className={styles.review__title}>Оцените книгу</p>
                    <button data-test-id='modal-close-button' onClick={onCloseButtonClick} type='button'>
                        <CloseIcon/>
                    </button>
                </div>
                <div className={styles.review__rating}>
                    <p className={styles.review__subtitle}>Ваша оценка</p>
                    <ul data-test-id='rating' className={styles.review__stars}>
                        {[...new Array(5)].map((item, index) => (
                            <button data-test-id='star' type='button' onClick={() => setRating(index+1)} className={styles.stars__item}>
                                {(index >= rating || rating === 0) ?
                                    <img src={iconStarUnfill} alt='rating star'/> :
                                    <img data-test-id='star-active' src={iconStarFill} alt='rating star'/>}
                            </button>
                        ))}
                    </ul>
                </div>
                <textarea data-test-id='comment' className={styles.review__text} onChange={(e) => setText(e.target.value)}
                          value={text} placeholder='Оставить отзыв' name='review'/>
                <button data-test-id='button-comment' onClick={onSendButtonClick} type='button' className={styles.review__btn}>ОЦЕНИТЬ</button>
            </div>
        </BluredWrapper>),
        document.body
    )
}
