import { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';
import Search from './Search';
import ContractTypeFilter from './ContractTypeFilter';

interface SidebarProps {
    children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <StyledSidebar $isOpen={isOpen}>
                <Search />
                <ContractTypeFilter />
                {children}
            </StyledSidebar>
            <ToggleButton
                onClick={toggleSidebar}
                className="toggle"
                $isOpen={isOpen}
            >
                <FaAngleLeft />
            </ToggleButton>
        </>
    );
};

interface StyledSidebarProps {
    $isOpen: boolean;
}

export const StyledSidebar = styled.div<StyledSidebarProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    transform: ${({ $isOpen }) =>
        $isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
    z-index: 200;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

interface ToggleButtonProps {
    $isOpen: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: ${({ $isOpen }) => ($isOpen ? '411px' : '79px')};
    z-index: 1000;
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

    svg {
        transform: ${({ $isOpen }) =>
            $isOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
    }
`;

export default Sidebar;
