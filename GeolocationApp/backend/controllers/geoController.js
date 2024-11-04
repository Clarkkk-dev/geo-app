const GeoHistory = require('../models/GeoHistory');
const axios = require('axios');

const getGeoInfo = (req, res) => {
    const ipAddress = req.params.ip || req.body.ip;
    axios.get(`https://ipinfo.io/${ipAddress}/geo`)
        .then(response => {
            const geoInfo = response.data;
            const userId = req.user.id; 
            GeoHistory.create(userId, ipAddress, JSON.stringify(geoInfo), (err) => {
                if (err) return res.status(500).json({ message: 'Error saving geo info' });
                res.json(geoInfo);
            });
        })
        .catch(err => {
            res.status(400).json({ message: 'Invalid IP address' });
        });
};

const getHistory = async (req, res) => {
    try {
      const userId = req.user.id; 
      const histories = await GeoHistory.find({ userId }); 
      res.json(histories);
    } catch (error) {
      console.error('Error fetching history:', error);
      res.status(500).send('Server error');
    }
  };

const deleteHistories = (req, res) => {
    const ids = req.body.ids; 
    GeoHistory.deleteMany(ids, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting histories' });
        res.json({ message: 'Histories deleted successfully' });
    });
};

module.exports = { getGeoInfo, getHistory, deleteHistories };
