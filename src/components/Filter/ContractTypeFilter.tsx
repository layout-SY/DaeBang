import styled from 'styled-components';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { toggleFilter } from '../../store/slice/filterSlice';

const ContractTypeFilter = () => {
    const dispatch = useTypedDispatch();
    const filters = useTypedSelector((state) => state.filters);

    const handleFilter = (filter: string) => {
        dispatch(toggleFilter(filter));
    };

    return (
        <StyledContractTypeFilter>
            <label htmlFor="contract-type-filter" style={{ display: 'none' }}>
                계약 유형 필터
            </label>
            <StyledToggleButton
                $isActive={filters.filters.includes('월세')}
                onClick={() => handleFilter('월세')}
            >
                월세
            </StyledToggleButton>
            <StyledToggleButton
                $isActive={filters.filters.includes('전세')}
                onClick={() => handleFilter('전세')}
            >
                전세
            </StyledToggleButton>
        </StyledContractTypeFilter>
    );
};

const StyledContractTypeFilter = styled.div`
    display: flex;
    gap: 10px;
`;

interface StyledToggleButtonProps {
    $isActive: boolean;
}

const StyledToggleButton = styled.button<StyledToggleButtonProps>`
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    background-color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.blue : 'white'};
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: ${({ $isActive, theme }) =>
        $isActive ? 'white' : theme.colors.text};
    width: 3.5rem;
    height: 100%;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;

export default ContractTypeFilter;
