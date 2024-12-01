import { configureStore } from '@reduxjs/toolkit';
import { detailReducer } from './slice/DetailSlice';
import { filtersReducer } from './slice/filterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = {
    detail: detailReducer,
    filters: filtersReducer,
};

const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export default store;

/*
  redux를 굳이 hook으로 만들 필요가 있나 싶긴 합니다.
  이미 store라는 폴더를 만들었으니 그 하위의 index.ts에서 모든걸 설정할 수 있을 것 같습니다.
  굳이 hook으로 빼서 관련 없는 폴더에 작성하면 코드 추적이 어려울 수 있습니다.

  위와 같이 수정할 수 있는데 프로젝트의 규모가 커지면 import 부분의 코드가 길어져서 보기 싫어질 수 있습니다.
  그럴때는 한줄씩 import 하지 않게 하나의 파일에서 모두 export 하도록 해주는 파일을 하나 생성해주시면 됩니다.
  ex) sample.ts
  import { detailReducer } from '../slice/DetailSlice';
  import { filtersReducer } from '../slice/filterSlice';

  const reducers = { detailReducer, filtersReducer };
  export default reducers;

  하지만 useSelector에서 매번 RootState 타입을 추가해야하는 번거로움을 줄이기 위해 공통화된 코드를 만들어 export를 한 것은 아주 좋습니다.
  덕분에 다른 파일에서 굳이 store의 state 타입(RootState)를 import 하는 코드를 작성하지 않아도 되어 개발자들의 개발환경을 개선했습니다.
*/
