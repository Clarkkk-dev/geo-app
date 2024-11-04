const db = require('../config/db');

const GeoHistory = {
    create: (userId, ipAddress, geoInfo, callback) => {
        const sql = 'INSERT INTO geo_histories (user_id, ip_address, geo_info) VALUES (?, ?, ?)';
        db.query(sql, [userId, ipAddress, geoInfo], (err, results) => {
            callback(err, results);
        });
    },

    findAllByUserId: (userId, callback) => {
        const sql = 'SELECT * FROM geo_histories WHERE user_id = ?';
        db.query(sql, [userId], (err, results) => {
            callback(err, results);
        });
    },

    deleteMany: (ids, callback) => {
        const sql = `DELETE FROM geo_histories WHERE id IN (${ids.join(',')})`;
        db.query(sql, (err, results) => {
            callback(err, results);
        });
    },
};

module.exports = GeoHistory;
