/**
 * 정규 표현식에서 사용되는 특수 문자를 이스케이프 처리합니다.
 * @param {string} str - 이스케이프 처리할 문자열
 * @returns {string} 이스케이프 처리된 문자열
 */
export const escapeRegExp = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
