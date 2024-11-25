import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { MdApartment } from 'react-icons/md';
import { CiBookmark } from 'react-icons/ci';
import { GiConfrontation } from 'react-icons/gi';
import { useSise } from '../hooks/useSise';
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
    { name: '북마크', value: 'bookmark', icon: <CiBookmark /> },
    { name: '시세비교', value: 'comparesise', icon: <GiConfrontation /> },
];

const CategoryBar = () => {
    const { category } = useParams<{ category: string }>();
    const { regionCode } = useSise();
    const location = useLocation();

    return (
        <StyledCategoryBar>
            <ul>
                {CATEGORY_LIST.map((item) => {
                    return (
                        <li key={item.value}>
                            <StyledLink
                                to={{
                                    pathname: `/${item.value}`,
                                    search: location.search,
                                }}
                                state={{ regionCode }}
                                $isActive={item.value === category}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </StyledLink>
                        </li>
                    );
                })}
            </ul>
        </StyledCategoryBar>
    );
};

// TODO : header tag로 이후 수정
const StyledCategoryBar = styled.nav`
    display: flex;
    flex-direction: column;
    width: 5rem;
    min-height: 100vh;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    background-color: white;
    z-index: 300;

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        list-style: none;
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
    background-color: ${({ $isActive }) => ($isActive ? '#3b82f6' : 'white')};
    gap: 0.25rem;
    transition: color 0.3s ease;
    font-weight: 700;
    font-size: 1.5rem;

    &:hover {
        color: #3b82f6;
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

export default CategoryBar;
