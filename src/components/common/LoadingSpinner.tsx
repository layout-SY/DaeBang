import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const LoadingSpinner = () => {
    return (
        <LoadingSpinnerStyle>
            <FaSpinner className="spinner" />
        </LoadingSpinnerStyle>
    );
};
const LoadingSpinnerStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .spinner {
        animation: spin 1s linear infinite;
        fill: 'orange';
    }
`;
export default LoadingSpinner;
