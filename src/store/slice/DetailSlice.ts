import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';

type TDetailState = {
    detailOpen: boolean;
    detailInfo: SiseOfBuildingWithXy | undefined;
};

const initialState: TDetailState = {
    detailOpen: false,
    detailInfo: undefined,
};

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setDetailOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.detailOpen = payload;
        },
        setDetail: (
            state,
            { payload }: PayloadAction<SiseOfBuildingWithXy>,
        ) => {
            state.detailInfo = payload;
        },
    },
});

export const { setDetail, setDetailOpen } = detailSlice.actions;
export const detailReducer = detailSlice.reducer;
