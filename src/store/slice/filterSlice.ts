import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FiltersState = string[]; // 필터는 "월세", "전세" 문자열 배열로 관리

const initialState: FiltersState = ['월세']; // 기본값으로 "월세" 필터 설정

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<string>) => {
            if (state.includes(action.payload)) {
                // 이미 필터가 활성화된 경우, 필터를 제거
                return state.filter((filter) => filter !== action.payload);
            } else {
                // 필터가 활성화되지 않은 경우, 추가
                return [...state, action.payload];
            }
        },
        resetFilters: () => initialState, // 필터 초기화
    },
});

export const { toggleFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
