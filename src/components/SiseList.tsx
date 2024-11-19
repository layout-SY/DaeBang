import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SiseApi } from '../api/Sise.api';

const SiseList = () => {
    const [siseData, setSiseData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getSise = async (lawdCd: number, dealYmd: number) => {
        const apiParams = {
            LAWD_CD: lawdCd,
            DEAL_YMD: dealYmd,
        };

        const api = SiseApi(apiParams);

        try {
            const response = await api.get('');
            setSiseData(JSON.stringify(response.data));
        } catch (err) {
            console.error('Error fetching Sise data:', err);
            setError('Failed to fetch data');
        }
    };

    useEffect(() => {
        getSise(11110, 202408);
    }, []);

    if (error) {
        return <SiseListStyle>Error: {error}</SiseListStyle>;
    }

    if (!siseData) {
        return <SiseListStyle>Loading...</SiseListStyle>;
    }

    return <SiseListStyle>Sise Data: {siseData}</SiseListStyle>;
};

const SiseListStyle = styled.div`
    padding: 20px;
    font-size: 16px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export default SiseList;
