/**
 * 가격을 한국식 억 단위로 변환하는 함수
 * @param price - 쉼표가 포함된 가격 문자열 또는 숫자 (예: "2,000" 또는 2000)
 * @returns {string} 변환된 한글 금액 단위 문자열 (예: "2억" 또는 "2억5000")
 * @example
 * formatPrice("2,000") // "2억"
 * formatPrice("2,500") // "2억5000"
 * formatPrice(25000) // "2억5000"
 */
export const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
        price = price.toString();
    }
    // 쉼표 제거 후 숫자로 변환
    const numPrice = parseInt(price.replace(/,/g, ''));

    const billion = Math.floor(numPrice / 10000);
    const remainder = numPrice % 10000;

    // 결과 문자열 생성
    if (billion > 0) {
        return remainder > 0 ? `${billion}억${remainder}` : `${billion}억`;
    }
    return remainder.toString();
};
