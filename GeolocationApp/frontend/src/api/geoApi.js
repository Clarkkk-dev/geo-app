const geoApi = {
  getGeoInfo: async (ipAddress) => {
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/geo`);
      if (!response.ok) {
        throw new Error(`Failed to fetch geolocation for IP: ${ipAddress}`);
      }
      const data = await response.json();
      return { data }; 
    } catch (error) {
      console.error('Error in geoApi.getGeoInfo:', error);
      throw error;
    }
  },
};

export default geoApi;
