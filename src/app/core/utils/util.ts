export function isEqualDate(date1: Date, date2: Date) {
    date1 = new Date(date1);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
