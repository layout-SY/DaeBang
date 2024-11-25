import { SiseOfBuilding, SiseOfBuildingWithXy } from '../models/Sise.model';

export const addXyToSiseOfBuilding = async (
    buildings: SiseOfBuilding[],
    signal?: AbortSignal,
): Promise<SiseOfBuildingWithXy[]> => {
    const promises = buildings.map(async (building) => {
        if (signal?.aborted) {
            throw new Error('요청이 취소되었습니다.');
        }
        const query = `${building.umdNum} ${building.jibun}`;

        try {
            const { x, y } = await getXyFromAddress(query, signal);
            return {
                ...building,
                x,
                y,
            };
        } catch (error) {
            if (signal?.aborted) {
                throw new Error('요청이 취소되었습니다.');
            }
            return {
                ...building,
                x: 0,
                y: 0,
            };
        }
    });

    return await Promise.all(promises);
};

export const getXyFromAddress = (
    address: string,
    signal?: AbortSignal,
): Promise<{ x: number; y: number }> => {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new Error('요청이 취소되었습니다.'));
        }
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
            if (signal?.aborted) {
                reject(new Error('요청이 취소되었습니다.'));
            }
            if (status === kakao.maps.services.Status.OK && result[0]) {
                const x = parseFloat(result[0].x);
                const y = parseFloat(result[0].y);
                resolve({ x, y });
            } else {
                reject(new Error('좌표를 가져올 수 없습니다.'));
            }
        });
    });
};
