export const formatPrice = (price: number): string => {
    if (price >= 10000) {
        const billions = Math.floor(price / 10000);
        const remainder = price % 10000;
        return remainder
            ? `${billions}억 ${remainder.toLocaleString()}만원`
            : `${billions}억`;
    }
    return `${price.toLocaleString()}만원`;
};
