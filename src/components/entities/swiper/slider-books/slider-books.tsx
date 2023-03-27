import {FC} from 'react';
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {useDispatch} from "react-redux";
import {ISliderBooks} from "./interface";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useThunkDispatch} from "../../../../hooks/redux/dispatchers";
import styles from './styles.module.scss'
import {BookCardReg} from "../../book-card/components";

export const SliderBooks: FC<ISliderBooks> = ({books, comments}) => {

    const thunkDispatch = useThunkDispatch();
    const dispatch = useDispatch();


    return (
        <div className={styles.swiper__wrapper}>
            <Swiper
                scrollbar={{
                    draggable: true,
                }}
                className={styles.root}
                spaceBetween={30}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    300: {
                        pagination: {
                            clickable: true,
                        },
                        slidesPerView: 1,
                    },
                    500: {
                        pagination: {
                            clickable: true,
                        },
                        slidesPerView: 2,
                    },
                    760: {
                        pagination: {
                            clickable: true,
                        },
                        slidesPerView: 3,
                    },
                    1100: {
                        pagination: {
                            clickable: true,
                        },
                        slidesPerView: 4,
                    },
                }}
            >
                {books.map((book) => {
                    const isReviewedByUser = comments.find(comment => comment.bookId === book.id);
                    const id = isReviewedByUser?.id;

                    return (
                        <SwiperSlide data-test-id='history-slide' key={book.id}>
                            <BookCardReg commentId={id} isReviewedByUser={!!isReviewedByUser} bookForHistory={book} isForProfileHistory={true} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
