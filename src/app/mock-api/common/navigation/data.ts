/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const parentNavigation: FuseNavigationItem[] = [
    {
        id: 'parentProfile',
        title: 'Parent Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/parentProfile',
    },
];

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Timetable',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'bio',
        title: 'Bio',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/profile/bio',
    },
    {
        id: 'contacts',
        title: 'Contact informations',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/profile/contacts',
    },
    {
        id: 'notes',
        title: 'Notes/Incidents',
        type: 'basic',
        icon: 'heroicons_outline:paper-clip',
        link: '/profile/notes',
    },
    {
        id: 'payments',
        icon: 'heroicons_outline:banknotes',
        title: 'Contracts and Payments',
        type: 'basic',
        link: '/profile/payments',
    },
    {
        id: 'attendance',
        icon: 'heroicons_outline:calendar-days',
        title: 'Attendance',
        type: 'basic',
        link: '/profile/attendance',
    },
    {
        id: 'grades',
        icon: 'heroicons_outline:book-open',
        title: 'Grades',
        type: 'basic',
        link: '/profile/grades',
    },
    {
        id: 'medicalInfo',
        icon: 'heroicons_outline:beaker',
        title: 'Medical info',
        type: 'basic',
        link: '/profile/medicalInfo',
    },
    {
        id: 'classes',
        icon: 'heroicons_outline:building-library',
        title: 'Classes',
        type: 'basic',
        link: '/profile/classes',
    },
    {
        id: 'files',
        icon: 'heroicons_outline:clipboard-document-check',
        title: 'Files',
        type: 'basic',
        link: '/profile/files',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Timetable',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Timetable',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'schedule',
        title: 'Timetable',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/schedule',
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
];
