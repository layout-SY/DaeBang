import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/redux';
import {
    addBookMark,
    deleteBookMark,
    isBookMarked,
} from '../../hooks/bookMark';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const DetailBookMarkButton = () => {
    const [bookmarked, setBookmarked] = useState(false);
    const { detailInfo } = useTypedSelector((state) => state.detail);

    useEffect(() => {
        if (detailInfo) {
            setBookmarked(isBookMarked(detailInfo));
        }
    }, [detailInfo]);

    const handleClickHeart = () => {
        if (!detailInfo) return;

        if (bookmarked) {
            setBookmarked(false);
            deleteBookMark(detailInfo);
            window.dispatchEvent(new Event('bookmarksChanged'));
        } else {
            setBookmarked(true);
            addBookMark(detailInfo);
            window.dispatchEvent(new Event('bookmarksChanged'));
        }
    };

    return (
        <DetailBookMarkButtonStyle
            className="bookmark"
            onClick={handleClickHeart}
        >
            {bookmarked ? <FaHeart /> : <FaRegHeart />}
        </DetailBookMarkButtonStyle>
    );
};
const DetailBookMarkButtonStyle = styled.button`
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;

    svg {
        font-size: 1.25rem;
    }
`;
export default DetailBookMarkButton;
