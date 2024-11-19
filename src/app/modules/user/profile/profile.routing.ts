export default [
    {
        path: '',
        loadComponent: () => import('./profile.component'),
        children: [
            { path: '', loadComponent: () => import('./bio/bio.component') },
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
        ],
    },
];
