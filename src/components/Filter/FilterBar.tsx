import styled from 'styled-components';
import ContractTypeFilter from './ContractTypeFilter';
import PeriodFilter from './PeriodFilter';
import FilterBox from './FilterBox';

const FilterBar = () => {
    return (
        <StyledFilterBar>
            <ContractTypeFilter />
            <PeriodFilter />
            <FilterBox />
        </StyledFilterBar>
    );
};

const StyledFilterBar = styled.div`
    position: absolute;
    top: 10px;
    right: -110%;
    display: flex;
    gap: 10px;
`;

export default FilterBar;
