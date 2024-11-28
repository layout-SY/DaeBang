import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Loader from './components/Common/Loader';

// 레이지 로딩을 위한 컴포넌트
const Home = lazy(() => import('./components/Home'));
const SiseList = lazy(() => import('./components/SiseList/SiseList'));
const CompareSise = lazy(() => import('./components/Compare/CompareSise'));
const BookmarkList = lazy(() => import('./components/Bookmark/BookmarkList'));

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path=":category" element={<SiseList />} />
            <Route
                path="/bookmark"
                element={
                    <Suspense fallback={<Loader />}>
                        <BookmarkList />
                    </Suspense>
                }
            />
            <Route
                path="/compare"
                element={
                    <Suspense fallback={<Loader />}>
                        <CompareSise />
                    </Suspense>
                }
            />
        </Route>
    </Routes>
);

export default AppRoutes;
