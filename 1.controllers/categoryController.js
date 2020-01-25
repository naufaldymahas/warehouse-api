const db = require('../database')

module.exports = {
    create: (req, res) => {
        const sql = `
        INSERT INTO categories
        VALUES
        (0, '${req.body.category}')
        `
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.status(201).send(result)
            } catch (err) {
                console.log(err)
            }
        })
    },

    index: (req, res) => {
        const sql = `
        SELECT * FROM categories
        `
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            }
        })
    }
}