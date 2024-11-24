import { SiseOfBuilding, SiseOfBuildingWithXy } from '../models/Sise.model';

export const addXyToSiseOfBuilding = async (
    buildings: SiseOfBuilding[],
): Promise<SiseOfBuildingWithXy[]> => {
    const promises = buildings.map(async (building) => {
        const query = `${building.umdNum} ${building.jibun}`;

        try {
            const { x, y } = await getXyFromAddress(query);
            return {
                ...building,
                x,
                y,
            };
        } catch (error) {
            console.error('좌표 가져오기 실패:', error);
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
): Promise<{ x: number; y: number }> => {
    return new Promise((resolve, reject) => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result[0]) {
                const x = parseFloat(result[0].x);
                const y = parseFloat(result[0].y);
                resolve({ x, y });
            } else {
                reject('좌표를 가져올 수 없습니다.');
            }
        });
    });
};
