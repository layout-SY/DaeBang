import { SiseOfBuildingWithXy } from '../models/Sise.model';

export const getBookMarks = (): SiseOfBuildingWithXy[] => {
    try {
        const data = localStorage.getItem('bookmark');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to parse bookmarks:', error);
        return [];
    }
};

const saveBookMarks = (bookmarks: SiseOfBuildingWithXy[]) => {
    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
};

export const isBookMarked = (house: SiseOfBuildingWithXy | null): boolean => {
    const existingBookmarks = getBookMarks();
    return existingBookmarks.some((bookmark) => {
        return JSON.stringify(bookmark) === JSON.stringify(house);
    });
};

export const addBookMark = (house: SiseOfBuildingWithXy) => {
    const existingBookmarks = getBookMarks();
    if (!isBookMarked(house)) {
        const newBookMarks = [...existingBookmarks, house];
        saveBookMarks(newBookMarks);
    }
};

export const deleteBookMark = (house: SiseOfBuildingWithXy) => {
    const existingBookmarks = getBookMarks();
    const newBookMarks = existingBookmarks.filter((bookmark) => {
        return JSON.stringify(bookmark) !== JSON.stringify(house);
    });
    saveBookMarks(newBookMarks);
};
