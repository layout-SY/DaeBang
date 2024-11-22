import { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';
import { useSise } from '../hooks/useSise';
import SideBarItem from './SideBarItem';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { WIDTH } from '../utils/constants';
import { Sise } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import { useSearchParams } from 'react-router-dom';

const Sidebar = () => {
    const { siseData } = useSise();
    const [isOpen, setIsOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [detailInfo, setDetailInfo] = useState<Sise | null>();

    const detailId = searchParams.get('detail_id');


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const openDetail = (house: Sise) => {
        setSearchParams({ detail_id: 'open' });
        setDetailInfo(house);
    };

    const closeDetail = () => {
        searchParams.delete('detail_id');
        setSearchParams(searchParams);
    };

    return (
        <>
            {/* 검색 창 */}
            <StyledSidebar $isOpen={isOpen}>
                {siseData.map((house, index) => (
                    <SideBarItem
                        house={house}
                        index={index}
                        key={index}
                        onClick={openDetail}
                    />
                ))}
            </StyledSidebar>

            <ToggleButton
                onClick={toggleSidebar}
                className="toggle"
                $isOpen={isOpen}
            >
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </ToggleButton>

            <Outlet />
            {detailId && detailInfo && (
                <DetailList house={detailInfo} closeDetail={closeDetail} />
            )}
        </>
    );
};

interface SidebarProps {
    $isOpen: boolean;
}

export const StyledSidebar = styled.div<SidebarProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: scroll;
    height: 100%;
    width: ${WIDTH};
    background-color: white;
    display: flex;
    flex-direction: column;
    transform: ${({ $isOpen }) =>
        $isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
    z-index: 200;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const ToggleButton = styled.button<SidebarProps>`
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: calc(5rem + ${WIDTH});
    transform: ${({ $isOpen }) =>
        $isOpen ? 'translateX(0%)' : `translateX(-${WIDTH})`};
    width: 23px;
    height: 46px;
    border: solid 1px ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
    background-color: #fff;
    font-size: 1.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 0 0.5rem 0.5rem 0;
    cursor: pointer;
    z-index: 200;
`;

export default Sidebar;
