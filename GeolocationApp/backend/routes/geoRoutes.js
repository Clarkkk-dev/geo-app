const express = require('express');
const { getGeoInfo, getHistory, deleteHistories } = require('../controllers/geoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:ip', authMiddleware, getGeoInfo);
router.get('/history', authMiddleware, getHistory);
router.delete('/history', authMiddleware, deleteHistories);

module.exports = router;
