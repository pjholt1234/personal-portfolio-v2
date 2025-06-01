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

const formatProjectType = (type: string): string => {
    switch (type) {
        case 'PERSONAL':
            return 'Personal Project';
        case 'PROFESSIONAL':
            return 'Professional Project';
        case 'ACADEMIC':
            return 'University Project';
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

export {
    mergeClassNames,
    formatDateTime,
    preloadProject,
    preloadEvent,
    formatProjectType
}