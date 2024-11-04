import React, { useState, useEffect } from 'react';
import geoApi from '../api/geoApi';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [userGeoInfo, setUserGeoInfo] = useState(null); 
  const [ipAddress, setIpAddress] = useState('');       
  const [inputIp, setInputIp] = useState('');           
  const [geoInfo, setGeoInfo] = useState(null);       
  const [history, setHistory] = useState([]);          
  const [userId, setUserId] = useState(1); 
  const [token, setToken] = useState(''); 

  // Fetch user's IP and geolocation on load
  useEffect(() => {
    const fetchUserIpAddress = async () => {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);

        const geoResponse = await geoApi.getGeoInfo(data.ip);
        setUserGeoInfo(geoResponse.data);
      } catch (error) {
        console.error('Failed to fetch user IP or geolocation:', error);
      }
    };

    fetchUserIpAddress();
  }, []);

  // Fetch user's search history when token changes
  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return; 

      try {
        const response = await fetch(`http://localhost:5000/api/geo/history`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [token]); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); 
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Validate IP address format
  const isValidIP = (ip) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const regexV6 = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80::([0-9a-fA-F]{0,4}%[0-9a-zA-Z]{1,})|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1[0-9]|[1-9]?[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9]?[0-9]))|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1[0-9]|[1-9]?[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9]?[0-9])))))$/;
    return regex.test(ip) || regexV6.test(ip);
  };

  // Handle IP submission
  const handleIpSubmit = async (e) => {
    e.preventDefault();
    if (isValidIP(inputIp)) {
      try {
        const response = await geoApi.getGeoInfo(inputIp);
        console.log('API response for entered IP:', response.data);
        setGeoInfo(response.data); 

        // Save the geolocation info to history in the database
        await fetch('/api/geoHistories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify({
            userId, 
            ipAddress: inputIp,
            geoInfo: response.data,
          }),
        });

        setHistory((prevHistory) => [...prevHistory, { ip_address: inputIp, geo_info: response.data }]);
      } catch (error) {
        console.error('Failed to fetch geolocation for entered IP:', error);
        alert('Invalid IP address or error with API.');
      }
    } else {
      alert('Please enter a valid IP address.');
    }
  };

  const handleHistoryClick = async (item) => {
    setGeoInfo(item.geo_info);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5">
        <h2 className="text-6xl font-bold text-center mb-6">Welcome back!</h2>
        <div className="text-center mb-4">
          <h3 className="text-4xl">Your IP:</h3>
          <p className="text-3xl text-gray-700">{ipAddress || 'Loading...'}</p>
        </div>

        <form onSubmit={handleIpSubmit} className="flex flex-col md:flex-row justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Enter another IP address"
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md mr-3 mb-3 md:mb-0"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">Get Geo Info</button>
        </form>

        {geoInfo && (
          <div className="bg-gray-100 p-4 rounded-md shadow-lg mb-6">
            <h3 className="text-3xl font-semibold">Geolocation Information for Entered IP:</h3>
            <p className="mt-2"><strong>IP:</strong> {geoInfo.ip}</p>
            <p><strong>City:</strong> {geoInfo.city}</p>
            <p><strong>Region:</strong> {geoInfo.region}</p>
            <p><strong>Country:</strong> {geoInfo.country}</p>
            <p><strong>Location:</strong> {geoInfo.loc}</p>
            <p><strong>Timezone:</strong> {geoInfo.timezone}</p>
            <p><strong>Organization:</strong> {geoInfo.org}</p>
          </div>
        )}

        <h3 className="text-3xl mb-4">Search History:</h3>
        <ul className="list-disc pl-5">
          {history.map((item, index) => (
            <p key={index} onClick={() => handleHistoryClick(item)} className="cursor-pointer hover:text-blue-600 transition duration-200">
              {item.ip_address}
            </p>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
