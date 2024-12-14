import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    filters: string[]; // 필터는 "월세", "전세" 문자열 배열로 관리
    year: string;
    month: string;
    depositRange: [number, number];
    rentRange: [number, number];
    areaRange: [number, number];
}

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () =>
    String(new Date().getMonth() + 1).padStart(2, '0');

const initialState: FiltersState = {
    filters: ['월세'], // 기본값으로 "월세" 필터 설정
    year: getCurrentYear().toString(),
    month: getCurrentMonth(),
    depositRange: [0, Infinity],
    rentRange: [0, Infinity],
    areaRange: [0, Infinity],
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<string>) => {
            if (state.filters.includes(action.payload)) {
                // 이미 필터가 활성화된 경우, 필터를 제거
                if (state.filters.length > 1) {
                    state.filters = state.filters.filter(
                        (filter) => filter !== action.payload,
                    );
                }
            } else {
                // 필터가 활성화되지 않은 경우, 추가
                state.filters.push(action.payload);
            }
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        setYear: (state, action: PayloadAction<string>) => {
            state.year = action.payload;
        },
        setMonth: (state, action: PayloadAction<string>) => {
            state.month = action.payload;
        },
        setDepositRange: (state, action: PayloadAction<[number, number]>) => {
            state.depositRange = action.payload;
        },
        setRentRange: (state, action: PayloadAction<[number, number]>) => {
            state.rentRange = action.payload;
        },
        setAreaRange: (state, action: PayloadAction<[number, number]>) => {
            state.areaRange = action.payload;
        },
    },
});

export const {
    toggleFilter,
    resetFilters,
    setYear,
    setMonth,
    setDepositRange,
    setRentRange,
    setAreaRange,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
