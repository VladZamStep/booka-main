const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
export const dayDifference = (date1, date2) => {
    const timeDifference = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDifference / MILLISEC_PER_DAY);
    return diffDays;
}