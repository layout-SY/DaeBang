import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SiseList2 from './components/SiseList2';
import CompareSise from './components/Sise/CompareSise';

// 라우팅은 여기서 설정합니다.
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path=":category" element={<SiseList2 />} />
            <Route
                path="/bookmark"
                element={<p style={{ width: '330px' }}>북마크</p>}
            />
            <Route path="/comparesise" element={<CompareSise />} />
        </Route>
    </Routes>
);

export default AppRoutes;
