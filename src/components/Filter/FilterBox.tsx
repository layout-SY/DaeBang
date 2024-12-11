import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import ReactSlider from 'react-slider';
import { formatPrice } from '../../utils/format';

const FilterBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [depositRange, setDepositRange] = useState<[number, number]>([
        0,
        Infinity,
    ]);
    const [rentRange, setRentRange] = useState<[number, number]>([0, Infinity]);
    const [areaRange, setAreaRange] = useState<[number, number]>([0, Infinity]);

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
            <StyledFilterBox onClick={handleToggle}>FilterBox</StyledFilterBox>
            {isOpen && (
                <DropdownBox>
                    <div>
                        <h3>가격</h3>
                        <label>보증금(전세금)</label>
                        <StyledSlider
                            min={0}
                            max={900000000}
                            step={10000000}
                            value={depositRange}
                            onChange={(value) =>
                                setDepositRange(value as [number, number])
                            }
                            withTracks
                            pearling
                        />
                        <span className="range-text">
                            {formatPrice(depositRange[0] / 100000)} ~{' '}
                            {depositRange[1] === Infinity
                                ? '무제한'
                                : `${formatPrice(depositRange[1] / 10000)}`}
                        </span>
                        <label>월세</label>
                        <StyledSlider
                            min={0}
                            max={3500000}
                            step={100000}
                            value={rentRange}
                            onChange={(value) =>
                                setRentRange(value as [number, number])
                            }
                            withTracks
                            pearling
                        />
                        <span className="range-text">
                            {formatPrice(rentRange[0] / 10000)} ~{' '}
                            {rentRange[1] === Infinity
                                ? '무제한'
                                : `${formatPrice(rentRange[1] / 10000)}`}
                        </span>
                    </div>
                    <div>
                        <h3>면적</h3>
                        <label>전용면적</label>
                        <StyledSlider
                            min={0}
                            max={300}
                            step={1}
                            value={areaRange}
                            onChange={(value) =>
                                setAreaRange(value as [number, number])
                            }
                            withTracks
                            pearling
                        />
                        <div>0 ~ 300</div>
                    </div>
                    <div>
                        <h3>연한</h3>
                        <label>전용면적</label>
                        <StyledSlider
                            min={0}
                            max={300}
                            step={1}
                            value={[0, 300]}
                            withTracks
                            pearling
                        />
                        <div>0 ~ 300</div>
                    </div>
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
    width: 300px;
    position: absolute;
    margin-top: 10px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledSlider = styled(ReactSlider)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 5px;
    margin-bottom: 10px;

    .thumb {
        height: 25px;
        width: 25px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: grab;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .track {
        top: 0;
        bottom: 0;
        background: #ddd;
        border-radius: 999px;
    }

    .track.track-1 {
        background: ${({ theme }) => theme.colors.blue};
    }
`;

export default FilterBox;
