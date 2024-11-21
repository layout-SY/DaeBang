export const generatePastMonths = (numMonths: number): string[] => {
    const dates: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < numMonths; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JS 월은 0부터 시작하므로 +1
        dates.push(`${year}${month.toString().padStart(2, '0')}`);
        currentDate.setMonth(currentDate.getMonth() - 1); // 한 달 전으로 이동
    }

    return dates;
};
