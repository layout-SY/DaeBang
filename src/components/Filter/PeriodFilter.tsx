import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setYear, setMonth } from '../../store/slice/filterSlice';

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () =>
    String(new Date().getMonth() + 1).padStart(2, '0');

const PeriodFilter = () => {
    const dispatch = useTypedDispatch();
    const year = useTypedSelector((state) => state.filters.year);
    const month = useTypedSelector((state) => state.filters.month);
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYear(event.target.value));
    };

    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (currentYear.toString() === year) {
            if (Number(event.target.value) > Number(currentMonth)) {
                alert('현재 이후의 월은 선택할 수 없습니다.');
                return;
            }
        }
        dispatch(setMonth(event.target.value));
    };

    const years = Array.from(
        { length: currentYear - 2006 + 1 },
        (_, i) => currentYear - i,
    );

    return (
        <StyledPeriodFilter>
            <label htmlFor="year-select" style={{ display: 'none' }}>
                년도 선택
            </label>
            <StyledSelect
                id="year-select"
                value={year}
                onChange={handleYearChange}
                aria-label="년도 선택"
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </StyledSelect>
            <label htmlFor="month-select" style={{ display: 'none' }}>
                월 선택
            </label>
            <StyledSelect
                id="month-select"
                value={month}
                onChange={handleMonthChange}
                aria-label="월 선택"
            >
                <option value="01">1월</option>
                <option value="02">2월</option>
                <option value="03">3월</option>
                <option value="04">4월</option>
                <option value="05">5월</option>
                <option value="06">6월</option>
                <option value="07">7월</option>
                <option value="08">8월</option>
                <option value="09">9월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
            </StyledSelect>
        </StyledPeriodFilter>
    );
};

const StyledPeriodFilter = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledSelect = styled.select`
    padding: 10px 15px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:focus {
        outline: none;
    }
`;

export default PeriodFilter;
