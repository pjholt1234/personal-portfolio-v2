let eventsCache: { data: any[], timestamp: number } | null = null;
let projectsCache: { data: any[], timestamp: number } | null = null;

const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION, 10);

const getEvents = async () => {
    const now = Date.now();
    if (eventsCache && (now - eventsCache.timestamp < CACHE_DURATION)) {
        return eventsCache.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events`);
        const data = await response.json();
        eventsCache = { data, timestamp: now };
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

const getProjects = async () => {
    const now = Date.now();
    if (projectsCache && (now - projectsCache.timestamp < CACHE_DURATION)) {
        return projectsCache.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`);
        const data = await response.json();
        projectsCache = { data, timestamp: now };
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export {
    getEvents,
    getProjects
}