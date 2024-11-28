import { useEffect, useState, Suspense, lazy } from 'react';
import styled from 'styled-components';
import { StyledSiseList } from '../SiseList/SiseList';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import { getBookMarks } from '../../hooks/useBookMarks';
import BookmarkItem from './BookmarkItem';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setDetail, setDetailOpen } from '../../store/slice/DetailSlice';

const DetailList = lazy(() => import('../Detail/DetailList'));

const BookmarkList = () => {
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

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };

    return (
        <BookmarkListStyle>
            {bookmarks && bookmarks.length > 0 ? (
                bookmarks.map((bookmark, index) => (
                    <BookmarkItem
                        key={index}
                        house={bookmark}
                        index={index}
                        onClick={() => openDetail(bookmark)}
                    />
                ))
            ) : (
                <Empty>
                    <span>북마크가 없습니다</span>
                </Empty>
            )}
            {detailOpen && (
                <Suspense fallback={<></>}>
                    <DetailList />
                </Suspense>
            )}
        </BookmarkListStyle>
    );
};
const BookmarkListStyle = StyledSiseList;
const Empty = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export default BookmarkList;
