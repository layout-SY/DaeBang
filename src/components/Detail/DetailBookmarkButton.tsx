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
            $isBookmarked={bookmarked}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? '북마크 제거하기' : '북마크 추가하기'}
            title={bookmarked ? '북마크 제거하기' : '북마크 추가하기'}
        >
            <FaHeart />
        </DetailBookMarkButtonStyle>
    );
};

interface DetailBookMarkButtonStyleProps {
    $isBookmarked: boolean;
}

const DetailBookMarkButtonStyle = styled.button<DetailBookMarkButtonStyleProps>`
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;

    svg {
        font-size: 1.25rem;
        color: ${({ $isBookmarked, theme }) =>
            $isBookmarked ? theme.colors.pink : theme.colors.gray};

        :hover {
            color: ${({ theme }) => theme.colors.pink};
        }
    }
`;
export default DetailBookMarkButton;
