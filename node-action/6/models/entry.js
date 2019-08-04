const redis = require('redis')
const db = redis.createClient()


class Entry {
    constructor(option) {
        for (let key in option) {
            this[key] = option[key]
        }
    }

    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return cb(err);
            let entries = [];
            items.forEach((item) => {
                entries.push(JSON.parse(item));
            });
            cb(null, entries);
        });
    }

    save(callback) {
        const entryJSON = JSON.stringify(this)
        db.lpush('entries', entryJSON, (err) => {
            if (err) return callback(err)
            callback()
        })
    }
}

module.exports = Entry