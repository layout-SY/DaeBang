import { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <StyledSidebar $isOpen={isOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    {isOpen ? '<' : '>'}
                </ToggleButton>
                <Outlet />
            </StyledSidebar>
        </>
    );
};

interface SidebarProps {
    $isOpen: boolean;
}

const StyledSidebar = styled.div<SidebarProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    min-width: 380px;
    background-color: white;
    display: flex;
    flex-direction: column;
    transform: ${({ $isOpen }) =>
        $isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
    z-index: 200;
`;

const ToggleButton = styled.button`
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 100%;
    width: 23px;
    height: 46px;
    border: solid 1px rgb(272, 272, 272);
    color: ${({ theme }) => theme.colors.primary};
    background-color: #fff;
    font-size: 1.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 0 0.5rem 0.5rem 0;
    cursor: pointer;
    outline: none;
    z-index: 10;
`;

export default Sidebar;
