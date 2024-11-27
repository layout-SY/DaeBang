export const formatPrice = (price: number): string => {
    if (price >= 10000) {
        const billions = Math.floor(price / 10000); // 억 단위
        const remainder = Math.floor(price % 10000); // 만 단위
        return remainder
            ? `${billions}억 ${remainder.toLocaleString()}만원`
            : `${billions}억`;
    }
    return `${Math.floor(price).toLocaleString()}만원`; // 만원 단위
};
