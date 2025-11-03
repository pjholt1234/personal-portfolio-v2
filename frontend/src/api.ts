let eventsCache: { data: any[], timestamp: number } | null = null;
let projectsCache: { data: any[], timestamp: number } | null = null;
let blocksCache: { [key: string]: { data: any, timestamp: number } } = {};
let completeEventsCache: { [key: string]: { data: any, timestamp: number } } = {};
let completeProjectsCache: { [key: string]: { data: any, timestamp: number } } = {};
let completePostsCache: { [key: string]: { data: any, timestamp: number } } = {};

const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION, 10000);

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

const getBlocks = async (modelType: string, pageSlug: string, enableCache: boolean = false) => {
    const cacheKey = `${modelType}-${pageSlug}`;
    const now = Date.now();

    if (enableCache && blocksCache[cacheKey] && (now - blocksCache[cacheKey].timestamp < CACHE_DURATION)) {
        return blocksCache[cacheKey]?.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${modelType}/${pageSlug}/blocks`);
        const data = await response.json();

        if (enableCache) {
            blocksCache[cacheKey] = { data, timestamp: now };
        }

        return data;
    } catch (error) {
        console.error('Error fetching blocks:', error);
        throw error;
    }
}

const getProject = async (projectSlug: string) => {
    const now = Date.now();
    const cacheKey = `project-${projectSlug}`;

    if (completeProjectsCache[cacheKey] && (now - completeProjectsCache[cacheKey].timestamp < CACHE_DURATION)) {
        return completeProjectsCache[cacheKey]?.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectSlug}`);
        const data = await response.json();

        completeProjectsCache[cacheKey] = { data, timestamp: now };
        return data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

const getEvent = async (eventSlug: string) => {
    const now = Date.now();
    const cacheKey = `event-${eventSlug}`;

    if (completeEventsCache[cacheKey] && (now - completeEventsCache[cacheKey].timestamp < CACHE_DURATION)) {
        return completeEventsCache[cacheKey]?.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventSlug}`);
        const data = await response.json();

        completeEventsCache[cacheKey] = { data, timestamp: now };
        return data;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
}

const getPost = async (projectSlug: string, postSlug: string) => {
    const now = Date.now();
    const cacheKey = `post-${projectSlug}-${postSlug}`;

    if (completePostsCache[cacheKey] && (now - completePostsCache[cacheKey].timestamp < CACHE_DURATION)) {
        return completePostsCache[cacheKey]?.data;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectSlug}/posts/${postSlug}`);
        const data = await response.json();

        completePostsCache[cacheKey] = { data, timestamp: now };
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export {
    getEvents,
    getProjects,
    getBlocks,
    getProject,
    getEvent,
    getPost,
}