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
        ],
    },
];
