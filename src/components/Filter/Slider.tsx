import React from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

interface SliderComponentProps {
    min: number;
    max: number;
    step: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    formatValue?: (value: number) => string;
}

const SliderComponent: React.FC<SliderComponentProps> = ({
    min,
    max,
    step,
    value,
    onChange,
    formatValue,
}) => {
    return (
        <div>
            <StyledSlider
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(value) => onChange(value as [number, number])}
                withTracks
                pearling
            />
            <Info>
                <span>{formatValue ? formatValue(value[0]) : value[0]}</span>
                <span>~</span>
                <span>{formatValue ? formatValue(value[1]) : value[1]}</span>
            </Info>
        </div>
    );
};

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

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    color: #666;
`;

export default SliderComponent;
