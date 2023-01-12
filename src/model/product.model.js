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

    whereClause: (search, category) => {
        // console.log("whereclause", { search, category })
        if (search && category) {
            return `WHERE title ILIKE '%${search}%' AND category ILIKE '${category}%'`
        } else if (search || category) {
            // console.log("OKOKOK")
            return `WHERE title ILIKE '%${search}%' OR category ILIKE '${category}%'`
        } else {
            return ""
        }
    },

    orderAndGroupClause: (sortBy, limit, offset) => {
        return `GROUP BY p.id ORDER BY title ${sortBy} LIMIT ${limit} OFFSET ${offset}`
    },

    read: function (search, category, sortBy = 'ASC', limit = 25, offset = 0) {
        // console.log("where", this.whereClause(search, category))
        // console.log("order", this.orderAndGroupClause(sortBy, limit, offset))
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                  p.id, p.title, p.price, p.category,
                  json_agg(row_to_json(pi)) images 
                FROM products p
                INNER JOIN products_images pi ON p.id = pi.id_product
                ${this.whereClause(search, category)}
                ${this.orderAndGroupClause(sortBy, limit, offset)}
                `,
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
    update: ({ id, title, img, price, category, file }) => {
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
                                if (file.length <= 0) return resolve({ id, title, price, category })

                                db.query(`SELECT id_image, filename FROM products_images WHERE id_product='${id}'`, (errProductImages, productImages) => {
                                    // ERROR HANDLING
                                    if (errProductImages) {
                                        return reject({ message: errProductImages.message });
                                    } else if (productImages.rows.length < file.length) {
                                        return reject("sorry:(...for now you can only upload images according to the previous number or lower");
                                    } else {
                                        for (let indexNew = 0; indexNew < file.length; indexNew++) {
                                            db.query(`UPDATE products_images SET filename=$1 WHERE id_image=$2`, [file[indexNew].filename, productImages.rows[indexNew].id_image], (err, result) => {
                                                if (err) return reject({ message: "Failed delete image!" })
                                                return resolve({ id, title, price, category, oldImages: productImages.rows, images: file })

                                            })
                                        }
                                    }
                                })
                                // return resolve({ id, title, img, price, category })
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
                        db.query(`DELETE FROM products_images WHERE id_product='${id}' RETURNING filename`, (err, result) => {
                            if (err) return reject({ message: 'Failed to remove image!' })
                            return resolve(result.rows)
                        })
                        // return resolve(`Products ${id} has been deleted`)
                    }
                }
            )
        })
    },
}

module.exports = productModel