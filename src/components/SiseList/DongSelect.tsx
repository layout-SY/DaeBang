import styled from 'styled-components';
import { WIDTH } from '../../utils/constants';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import { useState } from 'react';

interface DongSelectProps {
    data: SiseOfBuildingWithXy[];
    selectedDongs: string[];
    setSelectedDongs: (dongs: string[]) => void;
}

const DongSelect = ({
    data,
    selectedDongs,
    setSelectedDongs,
}: DongSelectProps) => {
    const [showAll, setShowAll] = useState(false);
    const uniqueDongs = Array.from(new Set(data.map((item) => item.umdNum)));
    const visibleDongs = showAll ? uniqueDongs : uniqueDongs.slice(0, 6);

    return (
        <StyledDongSelect>
            <FilterButton
                isActive={selectedDongs.length === 0}
                onClick={() => setSelectedDongs([])}
            >
                전체
            </FilterButton>
            {visibleDongs.map((umdNum) => (
                <FilterButton
                    key={umdNum}
                    isActive={selectedDongs.includes(umdNum)}
                    onClick={() =>
                        setSelectedDongs(
                            selectedDongs.includes(umdNum)
                                ? selectedDongs.filter(
                                      (dong) => dong !== umdNum,
                                  )
                                : [...selectedDongs, umdNum],
                        )
                    }
                >
                    {umdNum}
                </FilterButton>
            ))}
            {!showAll && uniqueDongs.length > 6 && (
                <MoreButton onClick={() => setShowAll(true)}>더보기</MoreButton>
            )}
            {showAll && (
                <MoreButton onClick={() => setShowAll(false)}>접기</MoreButton>
            )}
        </StyledDongSelect>
    );
};

export default DongSelect;

const StyledDongSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    width: ${WIDTH};
    gap: 0.5rem;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.blue : '#e0e0e0'};
    color: ${({ isActive }) => (isActive ? 'white' : '#333')};
    font-weight: bold;

    &:hover {
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
    }
`;

const MoreButton = styled.button`
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
    font-weight: bold;

    &:hover {
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
    }
`;
