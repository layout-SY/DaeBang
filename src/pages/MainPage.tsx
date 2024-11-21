import React, { useState } from 'react';
import Map from '../components/Map';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SiseList from '../components/Sise/SiseList';

const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Container>
            <SideBar>
                <SiseList searchParams={searchParams} />
            </SideBar>
            <MapWrapper>
                <Map
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            </MapWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex; /* Flexbox 레이아웃 */
    flex-direction: row; /* 가로 방향 배치 */
    height: 100vh; /* 화면 전체 높이 */
    width: 100vw; /* 화면 전체 너비 */
`;

const SideBar = styled.div`
    width: 300px; /* 고정 너비 */
    background-color: #fff; /* 흰색 배경 */
    border-right: 1px solid #ccc; /* 경계선 */
    overflow-y: auto; /* 스크롤 가능 */
`;

const MapWrapper = styled.div`
    flex: 1; /* 남은 공간 차지 */
    height: 100%; /* 부모 높이 전체 */
    position: relative;
`;

export default MainPage;
