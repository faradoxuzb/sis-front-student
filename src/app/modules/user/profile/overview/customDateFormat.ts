import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD.MM.YYYY', // Change this to your preferred input format
    },
    display: {
        dateInput: 'DD.MM.YYYY', // Change this to your preferred display format
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export class CustomDateAdapter extends NativeDateAdapter {
    // Override the format method if necessary
    format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-based
        const year = date.getFullYear();
        return `${this.padZero(day)}.${this.padZero(month)}.${year}`;
    }

    private padZero(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }
}
