import { useState } from 'react';
import { Sise } from '../models/Sise.model';

export const useSise = () => {
    const [siseData, setSiseData] = useState<Sise[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    return { siseData, setSiseData, error, setError };
};
