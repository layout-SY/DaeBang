import { detailReducer } from '../slice/DetailSlice';
import { filtersReducer } from '../slice/filterSlice';

const reducer = {
    detail: detailReducer,
    filters: filtersReducer,
};

export default reducer;
