export default [
    {
        path: '',
        loadComponent: () => import('./profile.component'),
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
                loadComponent: () => import('./grades/grades.component'),
            },
            {
                path: 'medicalInfo',
                loadComponent: () =>
                    import('./medicalInfo/medicalInfo.component'),
            },
        ],
    },
];
