import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaBalanceScale } from 'react-icons/fa';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { MdApartment } from 'react-icons/md';
import { FaRegBookmark } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

interface ICategory {
    name: string;
    value: string;
    icon: JSX.Element;
}

const CATEGORY_LIST: ICategory[] = [
    { name: '원/투룸', value: 'onetwo', icon: <FaHome /> },
    { name: '오피스텔', value: 'officetel', icon: <HiMiniBuildingOffice /> },
    { name: '아파트', value: 'apt', icon: <MdApartment /> },
    { name: '북마크', value: 'bookmark', icon: <FaRegBookmark /> },
    { name: '시세비교', value: 'compare', icon: <FaBalanceScale /> },
];

const CategoryBar = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1];

    return (
        <StyledCategoryBar>
            <StyledLink to="/" $isActive={false}>
                <LogoText>
                    <span>⌂대방</span>
                </LogoText>
            </StyledLink>
            <nav>
                <ul>
                    {CATEGORY_LIST.map((item) => {
                        return (
                            <li key={item.value}>
                                <StyledLink
                                    to={{
                                        pathname: `/${item.value}`,
                                        search: location.search,
                                    }}
                                    $isActive={item.value === currentPath}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </StyledLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </StyledCategoryBar>
    );
};

const StyledCategoryBar = styled.header`
    display: flex;
    flex-direction: column;
    width: 5rem;
    min-height: 100vh;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    background-color: white;
    z-index: 300;

    nav {
        ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            list-style: none;
        }
    }
`;

interface StyledLinkProps {
    $isActive: boolean;
}

const StyledLink = styled(Link)<StyledLinkProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    color: ${({ $isActive }) => ($isActive ? 'white' : '#4b5563')};
    background-color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.blue : 'white'};
    gap: 0.25rem;
    transition: color 0.3s ease;
    font-weight: 700;
    font-size: 1.5rem;

    &:hover {
        color: ${({ theme }) => theme.colors.blue};
        font-weight: 800;
        background-color: rgb(237, 237, 237);
    }

    svg {
        path {
            color: inherit;
        }
    }

    span {
        color: inherit;
        font-size: 0.75rem;
        text-align: center;
    }
`;

const LogoText = styled.h1`
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    isolation: isolate;

    span {
        position: relative;
        z-index: 2;
        font-size: 1.5rem;
    }

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 35%;
        transform: translateX(-50%) skew(-12deg);
        width: 55px;
        height: 10px;
        background-color: rgba(59, 130, 246, 0.3);
        z-index: 1;
        transition: all 0.3s ease;
    }

    &:hover::after {
        background-color: rgba(59, 130, 246, 0.5);
        transform: translateX(-50%) skew(-43deg);
    }
`;

export default CategoryBar;
