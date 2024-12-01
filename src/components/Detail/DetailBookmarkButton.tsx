import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks/redux';
import {
    addBookMark,
    deleteBookMark,
    isBookMarked,
} from '../../hooks/useBookMarks';
import { FaHeart } from 'react-icons/fa';

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
        } else {
            setBookmarked(true);
            addBookMark(detailInfo);
        }
        window.dispatchEvent(new Event('bookmarksChanged'));
        /* 
          window.dispatchEvent(new Event('bookmarksChanged')); 는 bookmarked와 관계 없이 일어나는 부분이니
          if문 바깥쪽에 작성하는 것이 가독성에 더 좋고 코드의 양도 줄여줄 수 있을 것 같습니다.
        */
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
