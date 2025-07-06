export const getCV = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cv`, {
            headers: {
                'Accept': 'application/pdf',
            },
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching CV:', error);
        throw error;
    }
}; 