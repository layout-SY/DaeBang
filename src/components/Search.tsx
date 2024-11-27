import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import univ from '../data/univ.json';
import sub from '../data/sub.json';
import { escapeRegExp } from '../utils/string';
import { useSearchParams } from 'react-router-dom';
import { set } from 'lodash';

interface Item {
    name: string;
    x: number;
    y: number;
}

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                inputRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 검색어 입력 처리
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsOpen(true);
        setActiveIndex(-1);

        // 자동완성 로직
        const combinedData = [...univ, ...sub];
        const filteredSuggestions = combinedData.filter((item) =>
            item.name.includes(value),
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
    };

    // 키보드 이벤트 처리
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
                setActiveIndex(0);
            } else {
                setActiveIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < suggestions.length ? nextIndex : 0;
                });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
                setActiveIndex(suggestions.length - 1);
            } else {
                setActiveIndex((prevIndex) => {
                    const nextIndex = prevIndex - 1;
                    return nextIndex >= 0 ? nextIndex : suggestions.length - 1;
                });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < suggestions.length) {
                // 활성화된 항목이 있으면 해당 항목으로 이동
                handleMove(suggestions[activeIndex]);
            } else {
                // 활성화된 항목이 없으면 검색 수행
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };

    const handleSearch = () => {
        if (searchTerm === '') {
            alert('검색어를 입력해주세요.');
            return;
        }

        if (suggestions.length === 0) {
            alert('검색 결과가 없습니다.');
            setSearchTerm('');
            return;
        }

        handleMove(suggestions[0]);
    };

    const handleMove = (item: Item) => {
        window.mapInstance.panTo(new kakao.maps.LatLng(item.y, item.x));
    };

    return (
        <SearchWrapper>
            <SearchBar>
                <SearchIcon onClick={handleSearch}>
                    <FaSearch />
                </SearchIcon>
                <Input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="대학, 지하철 검색"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    aria-controls="search-suggestion-list"
                    aria-activedescendant={
                        activeIndex >= 0
                            ? `suggestion-${activeIndex}`
                            : undefined
                    }
                />
            </SearchBar>
            {searchTerm && suggestions.length > 0 && (
                <Dropdown
                    id="search-suggestion-list"
                    role="listbox"
                    ref={dropdownRef}
                    $isOpen={isOpen}
                >
                    {suggestions.map((suggestion, index) => {
                        const isActive = index === activeIndex;
                        const regex = new RegExp(
                            `(${escapeRegExp(searchTerm)})`,
                            'gi',
                        );
                        const parts = suggestion.name.split(regex);
                        return (
                            <DropdownItem
                                key={index}
                                id={`suggestion-${index}`}
                                role="option"
                                tabIndex={-1}
                                aria-selected={isActive}
                                onMouseDown={() => {
                                    setSearchTerm(suggestion.name);
                                    setIsOpen(false);
                                    setActiveIndex(-1);
                                }}
                                className={isActive ? 'active' : undefined}
                            >
                                {parts.map((part, i) =>
                                    regex.test(part) ? (
                                        <Highlight key={i}>{part}</Highlight>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    ),
                                )}
                            </DropdownItem>
                        );
                    })}
                </Dropdown>
            )}
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    margin: 0 auto;
    position: relative;
    width: 320px;
    padding: 20px;
`;

const SearchBar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 17%;
    left: 10px;
    color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
    border-radius: 50%;

    & :hover {
        background-color: #f0f0f0;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 10px 10px 35px;
    border: 2px solid ${({ theme }) => theme.colors.blue};
    border-radius: 8px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.blue};
    }
`;

interface DropdownProps {
    $isOpen: boolean;
}

const Dropdown = styled.ul<DropdownProps>`
    position: absolute;
    top: 80%;
    left: auto;
    width: 280px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: ${({ $isOpen }) => ($isOpen ? '180px' : '0')};
    overflow-y: hidden;
    transition: max-height 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;

    &.active,
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.blue};
`;

export default Search;
