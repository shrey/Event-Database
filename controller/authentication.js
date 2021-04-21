var mySqlConnection = require('../utils/db')
const bcyrpt = require('bcryptjs')
var mysql = mySqlConnection()

const randomString = () => {
    return Math.random().toString(36).slice(2);
}
const registerController = async (user) => {
    try {
        const hashPassword = bcyrpt.hashSync(user.password)
        const CREATE_USER = `INSERT INTO user (email, password, name, id) VALUES ('${user.email}', '${hashPassword}', '${user.name}', '${randomString()}')`
        await mysql.query(CREATE_USER, (err) => {
            if(err) {
                return {
                    success: false
                }
            }
            return {
                success: true
            }
        })
    } catch (err) {
        return {
            success: false
        }
    }
}

module.exports = {
    registerController: registerController
}