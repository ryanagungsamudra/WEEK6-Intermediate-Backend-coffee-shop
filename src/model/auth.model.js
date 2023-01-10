const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

const authModel = {
    login: ({ email, password }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
                //username = unique||email = unique
                if (err) return reject(err.message)
                if (result.rows.length == 0) return reject('Wrong email or password!') //ketika email salah

                bcrypt.compare(password, result.rows[0].password,
                    function (err, hashingResult) {
                        //parameter dari user itu ada yang tidak valid (kosong)
                        //dari database yang atas (length, harus email ditemukan)
                        //bycript ada error yang kita tidak tahu
                        if (err) return reject(err.message) //kesalahan hashing(bycript)
                        if (!hashingResult) return reject('Wrong email or password!') //ketika password salah
                        return resolve(result.rows[0])
                    });
            })

        });
    },
    register: ({ email, password, mobile_number, name, gender, birthdate, address }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (id, email, password, mobile_number, name, gender, birthdate, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
                [uuidv4(), email, password, mobile_number, name, gender, birthdate, address],
                (err, result) => {
                    if (err) {
                        return reject(err.message);
                    } else {
                        return resolve("Your account is registered!");
                    }
                }
            );
        });
    },
};

module.exports = authModel;