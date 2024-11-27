import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SiseList from './components/SiseList';
import Home from './components/Home';
import CompareSise from './components/Sise/CompareSise';
import BookmarkList from './components/Bookmark/BookmarkList';

// 라우팅은 여기서 설정합니다.
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            {/* 현재 홈페이지는 내용이 없고 바로 /onetwo로 리다이렉트 됩니다. */}
            <Route path="/" element={<Home />} />
            <Route path=":category" element={<SiseList />} />
            <Route path="/bookmark" element={<BookmarkList />} />
            <Route path="/compare" element={<CompareSise />} />
        </Route>
    </Routes>
);

export default AppRoutes;
