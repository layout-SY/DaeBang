import { SiseOfBuilding, SiseOfBuildingWithXy } from '../models/Sise.model';

/**
 * 주어진 건물 목록에 대해 주소를 기반으로 좌표(x, y)를 추가하는 함수
 * @param buildings - 좌표를 추가할 건물 목록
 * @param signal - 요청을 취소할 수 있는 AbortSignal 객체 (선택적)
 * @returns 좌표가 추가된 건물 목록을 담은 Promise
 * @throws {Error} 요청이 취소되었거나 좌표를 가져올 수 없는 경우
 */
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

/**
 * 주소를 기반으로 좌표(x, y)를 조회하는 함수
 * @param address - 좌표를 조회할 주소 문자열
 * @param signal - 요청을 취소할 수 있는 AbortSignal 객체 (선택적)
 * @returns x, y 좌표값을 담은 객체를 반환하는 Promise
 * @throws {Error} 요청이 취소되었거나 좌표를 가져올 수 없는 경우
 */
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
