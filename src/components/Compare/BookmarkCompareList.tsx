import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledSiseList } from '../SiseList';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import { getBookMarks } from '../../hooks/bookMark';
import BookmarkItem from '../Bookmark/BookmarkItem';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setDetail, setDetailOpen } from '../../store/slice/DetailSlice';
import DetailList from '../Detail/DetailList';
import { WIDTH } from '../../utils/constants';

interface BookmarkCompareListProps {
    comparedData: SiseOfBuildingWithXy[];
    setComparedData: React.Dispatch<
        React.SetStateAction<SiseOfBuildingWithXy[]>
    >;
}

const BookmarkCompareList = ({
    comparedData,
    setComparedData,
}: {
    comparedData: SiseOfBuildingWithXy[];
    setComparedData: React.Dispatch<
        React.SetStateAction<SiseOfBuildingWithXy[]>
    >;
}) => {
    const [bookmarks, setBookmarks] = useState<SiseOfBuildingWithXy[]>([]);
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        setBookmarks(getBookMarks());

        const handleStorageChange = () => {
            setBookmarks(getBookMarks());
        };

        window.addEventListener('bookmarksChanged', handleStorageChange);

        return () => {
            window.removeEventListener('bookmarksChanged', handleStorageChange);
        };
    }, []);

    const handleClick = (bookmark: SiseOfBuildingWithXy) => {
        setComparedData((prev) => {
            if (prev.length < 2) {
                return [...prev, bookmark];
            } else if (prev.length === 2) {
                setComparedData([]);
                setComparedData((prev) => [...prev, bookmark]);
            }
            return prev;
        });
    };

    return (
        <BookmarkCompareListStyle>
            {bookmarks && bookmarks.length > 0 ? (
                bookmarks.map((bookmark, index) => (
                    <BookmarkItem
                        key={index}
                        house={bookmark}
                        index={index}
                        onClick={() => handleClick(bookmark)}
                    />
                ))
            ) : (
                <Empty>
                    <span>북마크가 없습니다</span>
                </Empty>
            )}
            {detailOpen && <DetailList />}
        </BookmarkCompareListStyle>
    );
};

const BookmarkCompareListStyle = styled.div`
    position: fixed;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    top: 0;
    left: calc(550px + ${WIDTH});
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 30px;
    height: 100%;
    width: ${WIDTH};
    z-index: 1400;
    padding: 20px 0;
    background: #fff;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`;
const Empty = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export default BookmarkCompareList;
