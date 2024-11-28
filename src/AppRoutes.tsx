import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import LoadingLayout from './components/LoadingLayout';

// 레이지 로딩을 위한 컴포넌트
const Home = lazy(() => import('./components/Home'));
const SiseList = lazy(() => import('./components/SiseList'));
const CompareSise = lazy(() => import('./components/Compare/CompareSise'));
const BookmarkList = lazy(() => import('./components/Bookmark/BookmarkList'));

const AppRoutes = () => (
    <Suspense fallback={<LoadingLayout />}>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path=":category" element={<SiseList />} />
                <Route path="/bookmark" element={<BookmarkList />} />
                <Route path="/compare" element={<CompareSise />} />
            </Route>
        </Routes>
    </Suspense>
);

export default AppRoutes;
