import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Slider from './Slider';
import { formatPrice } from '../../utils/format';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import {
    setDepositRange,
    setRentRange,
    setAreaRange,
} from '../../store/slice/filterSlice';

const FilterBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { depositRange, rentRange, areaRange } = useTypedSelector(
        (state) => state.filters,
    );
    const dispatch = useTypedDispatch();

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef}>
            <StyledFilterBox onClick={handleToggle}>
                가격 면적 필터
            </StyledFilterBox>
            {isOpen && (
                <DropdownBox>
                    <Filter>
                        <FilterTitle>가격</FilterTitle>
                        <label>보증금(전세금)</label>
                        <Slider
                            min={0}
                            max={91000}
                            step={1000}
                            value={depositRange}
                            onChange={(value) => {
                                if (value[1] > 90000) {
                                    dispatch(
                                        setDepositRange([value[0], Infinity]),
                                    );
                                } else {
                                    dispatch(setDepositRange(value));
                                }
                            }}
                            formatValue={(value) =>
                                value === Infinity
                                    ? '무제한'
                                    : `${formatPrice(value)}`
                            }
                        />

                        <label>월세</label>
                        <Slider
                            min={0}
                            max={360}
                            step={10}
                            value={rentRange}
                            onChange={(value) => {
                                if (value[1] > 350) {
                                    dispatch(
                                        setRentRange([value[0], Infinity]),
                                    );
                                } else {
                                    dispatch(setRentRange(value));
                                }
                            }}
                            formatValue={(value) =>
                                value === Infinity
                                    ? '무제한'
                                    : `${formatPrice(value)}`
                            }
                        />
                    </Filter>
                    <Filter>
                        <FilterTitle>면적</FilterTitle>
                        <label>전용면적</label>
                        <Slider
                            min={0}
                            max={6 * 33 + 33}
                            step={33}
                            value={areaRange}
                            onChange={(value) => {
                                if (value[1] > 6 * 33) {
                                    dispatch(
                                        setAreaRange([value[0], Infinity]),
                                    );
                                } else {
                                    dispatch(setAreaRange(value));
                                }
                            }}
                            formatValue={(value) =>
                                value === Infinity ? '무제한' : `${value}㎡`
                            }
                        />
                    </Filter>
                </DropdownBox>
            )}
        </div>
    );
};

const StyledFilterBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    height: 100%;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;

const DropdownBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 300px;
    position: absolute;
    margin-top: 10px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FilterTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
`;

export default FilterBox;
