const mergeClassNames = (...classList: (string | false | null | undefined)[]): string => {
    return classList.filter(Boolean).join(' ');
}

const formatDateTime = (date: string): string => {
    return new Date(date).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
    });
}

const preloadProject = () => import('./pages/Project');

const preloadEvent = () => import('./pages/Event');

export {
    mergeClassNames,
    formatDateTime,
    preloadProject,
    preloadEvent
}