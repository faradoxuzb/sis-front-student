import { studentProfileResolver } from '../../../core/user/guardian-profile.resolver';
import { DailyGradesComponent } from './daily-grades/daily-grades.component';
import { quarterlyResolver } from './quarterly.resolver';

export default [
    {
        path: '',
        loadComponent: () => import('./profile.component'),
        resolve: {
            studentProfile: studentProfileResolver
        },
        children: [
            { path: 'bio', loadComponent: () => import('./bio/bio.component') },
            {
                path: 'overview',
                loadComponent: () => import('./overview/overview.component'),
            },
            {
                path: 'contacts',
                loadComponent: () => import('./contacts/contacts.component'),
            },
            {
                path: 'classes',
                loadComponent: () => import('./classes/classes.component'),
            },
            {
                path: 'files',
                loadComponent: () => import('./files/files.component'),
            },
            {
                path: 'contracts',
                loadComponent: () => import('./contracts/contracts.component'),
            },
            {
                path: 'payments',
                loadComponent: () => import('./payments/payments.component'),
            },
            {
                path: 'notes',
                loadComponent: () => import('./notes/notes.component'),
            },
            {
                path: 'attendance',
                loadComponent: () =>
                    import('./attendance/attendance.component'),
            },
            {
                path: 'grades',
                component: DailyGradesComponent,
                resolve: {
                    quarters: quarterlyResolver
                }
            },
            {
                path: 'daily-grades',
                component: DailyGradesComponent
            },
            {
                path: 'medicalInfo',
                loadComponent: () =>
                    import('./medicalInfo/medicalInfo.component'),
            },
        ],
    },
];
