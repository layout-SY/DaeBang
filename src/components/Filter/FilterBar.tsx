import styled from 'styled-components';
import ContractTypeFilter from './ContractTypeFilter';
import PeriodFilter from './PeriodFilter';

const FilterBar = () => {
    return (
        <StyledFilterBar>
            <ContractTypeFilter />
            <PeriodFilter />
        </StyledFilterBar>
    );
};

const StyledFilterBar = styled.div`
    position: absolute;
    top: 10px;
    right: -85%;
    display: flex;
    gap: 10px;
`;

export default FilterBar;
