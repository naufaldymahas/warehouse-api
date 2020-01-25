const db = require('../database')
const datetime = require('../helpers/datetime')

module.exports = {
    create: (req, res) => {

        const data = JSON.parse(req.body.data)

        const {
            productName,
            category,
            price,
            weight,
            stock,
        } = data

        const sql = `
        INSERT INTO products VALUES
        (0, '${productName}', ${category}, ${price}, '${weight}', ${stock}, '${req.file.filename}', '${datetime}')
        `
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.status(201).send('Product has been added!')
            } catch (err) {
                console.log(err)
            }
        })
    },

    createWithCategory: (req, res) => {
        const data = JSON.parse(req.body.data)
        const {
            productName,
            category,
            price,
            weight,
            stock
        } = data
        const sql1 = `INSERT INTO categories VALUES (0, '${category}')`
        db.query(sql1, (err, result) => {
            if (err) throw err
            db.query(`
            INSERT INTO products VALUES
            (0, '${productName}', ${result.insertId}, ${price}, '${weight}', ${stock}, '${req.file.filename}', '${datetime}')
            `, (err, result) => {
                if (err) throw err
                res.status(201).send('Product has been added!')
            })
        })
    },

    getWithCategory: (req, res) => {
        const sql = `
        SELECT p.id, name, p.category, c.category categoryName, price, weight, stock, photo
        FROM products p
        JOIN categories c on p.category = c.id
        `
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
                res.sendStatus(500)
            }
        })
    },

    update: (req, res) => {

        const data = JSON.parse(req.body.data)

        const {
            productName,
            category,
            price,
            weight,
            stock
        } = data

        let sql = `
        UPDATE products
        SET name = '${productName}', category = ${category}, price = ${price}, weight = '${weight}', stock = ${stock}`
        if (req.file) sql += `, photo = '${req.file.filename}'`
        sql += ` where id = ${req.params.id}`
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.status(201).send('Data has been updated!')
            } catch (error) {
                console.log(error)
                res.sendStatus(500)
            }
        })
    },

    updateWithCategory: (req, res) => {

        const data = JSON.parse(req.body.data)

        const {
            productName,
            category,
            price,
            weight,
            stock
        } = data

        const sql1 = `
        INSERT INTO categories values (0, '${category}')`

        db.query(sql1, (err, result) => {
            try {
                if (err) throw err

                let sql2 = `
                UPDATE products
                SET name = '${productName}', category = ${result.insertId}, price = ${price}, weight = '${weight}', stock = ${stock}`
                if (req.file) sql2 += `, photo = '${req.file.filename}'`
                sql2 += ` where id = ${req.params.id}`

                db.query(sql2, (err, result) => {
                    if (err) throw err
                    res.status(201).send('Data has been updated!')
                })

            } catch (error) {
                console.log(error)
                res.sendStatus(500)
            }
        })
    },

    remove: (req, res) => {
        const sql = `
        DELETE FROM products where id = ${req.params.id}
        `
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.status(204).send('Data has been removed!')
            } catch (error) {
                console.log(error)
                res.sendStatus(500)
            }
        })
    }
    
}