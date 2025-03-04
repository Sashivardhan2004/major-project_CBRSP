export const fetchProvidersList = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/providers'); // Adjust the endpoint if needed
    if (!response.ok) throw new Error('Failed to fetch providers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
};
