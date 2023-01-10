const { query } = require('express');
const db = require('../../helper/connection');
const { v4: uuidv4 } = require('uuid');

const productModel = {
    // CREATE
    create: ({ title, price, category, file }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO products (id, title, price, category) VALUES ('${uuidv4()}','${title}','${price}','${category}') RETURNING id`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        for (let index = 0; index < file.length; index++) {
                            db.query(`INSERT INTO products_images (id_image, id_product, name, filename) VALUES($1, $2 ,$3 , $4)`, [uuidv4(), result.rows[0].id, title, file[index].filename])
                        }
                        return resolve({ title, price, category, images: file })
                    }
                }
            )
        })
    },

    // READ
    query: (search, category, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY title ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !category) {
            return orderQuery
        } else if (search && category) {
            return `WHERE title ILIKE '%${search}%' AND category ILIKE '${category}%' ${orderQuery}`
        } else if (search || category) {
            return `WHERE title ILIKE '%${search}%' OR category ILIKE '${category}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, category, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                  products.id, products.title, products.price, products.category,  
                  json_agg(row_to_json(products_images)) images 
                FROM products 
                INNER JOIN products_images ON products.id=products_images.id_product
                GROUP BY products.id ${this.query(search, category, sortBy, limit, offset)}`,
                // `SELECT * from products ${this.query(search, category, sortBy, limit, offset)}`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

readDetail: (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * from products WHERE id='${id}'`,
            (err, result) => {
                if (err) {
                    return reject(err.message)
                } else {
                    return resolve(result.rows[0])
                }
            }
        );
    })
},

    // UPDATE
    update: ({ id, title, img, price, category }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE products SET title='${title || result.rows[0].title}', img='${img || result.rows[0].img}',price='${price || result.rows[0].price}', category='${category || result.rows[0].category}' WHERE id='${id}'`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message)
                            } else {
                                return resolve({ id, title, img, price, category })
                            }
                        }
                    )
                }
            })
        })
    },

        // DELETE
        // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
        remove: (id) => {
            return new Promise((resolve, reject) => {
                db.query(
                    `DELETE from products WHERE id='${id}'`,
                    (err, result) => {
                        if (err) {
                            return reject(err.message)
                        } else {
                            return resolve(`products ${id} has been deleted`)
                        }
                    }
                )
            })
        }
}

module.exports = productModel