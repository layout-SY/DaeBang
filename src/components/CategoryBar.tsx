import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { MdApartment } from 'react-icons/md';
import { CiBookmark } from 'react-icons/ci';

interface ICategory {
    name: string;
    value: string;
    icon: JSX.Element;
}

const CATEGORY_LIST: ICategory[] = [
    { name: '원/투룸', value: 'dasedae', icon: <FaHome /> },
    { name: '오피스텔', value: 'officetel', icon: <HiMiniBuildingOffice /> },
    { name: '아파트', value: 'apt', icon: <MdApartment /> },
    { name: '북마크', value: 'bookmark', icon: <CiBookmark /> },
];

const CategoryBar = () => {
    // const { category } = useParams<{ category: string }>();
    // TODO : useParam을 이용해서 현재 선택된 카테고리를 표시
    return (
        <StyledCategoryBar>
            <ul>
                {CATEGORY_LIST.map((category) => {
                    return (
                        <li key={category.value}>
                            <Link to={`/${category.value}`}>
                                {category.icon}
                                <span>{category.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </StyledCategoryBar>
    );
};

const StyledCategoryBar = styled.nav`
    display: flex;
    flex-direction: column;
    width: 5rem;
    min-height: 100vh;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        li {
            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 4.5rem;
                height: 4.5rem;
                border-radius: ${({ theme }) => theme.borderRadius.default};
                gap: 0.25rem;
                color: #4b5563;
                transition: color 0.3s ease;
                font-weight: 700;
                font-size: 1.5rem;

                &:hover {
                    color: #3b82f6;
                    font-weight: 800;
                    background-color: rgb(237, 237, 237);
                }

                span {
                    font-size: 0.75rem;
                    text-align: center;
                }
            }
        }
    }
`;

export default CategoryBar;
