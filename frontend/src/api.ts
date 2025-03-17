
const getEvents = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events`);
    return await response.json();
}

const getProjects = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`);
    return await response.json();
}

export {
    getEvents,
    getProjects
}
