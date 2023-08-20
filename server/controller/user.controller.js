const db = require('../db')

class UserController {
    async getUser(req, res) {
            const users = await db.query('SELECT * FROM personbases;')
            res.json(users.rows)
    }
    async checkUser(req, res) {
        try {
            const {phone} = req.body
            const users = await db.query('SELECT * FROM personbases WHERE phone = $1', [phone])
            console.log(users)
            if(users.rowCount > 0) {
                res.json(users.rows[0])
            } else {
                res.json({exists: false})
            }
        }
         catch (err) {
            console.error('Ошибка првоерки:', err)
            res.status(500).json({error: "Server Error"})

         }
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const oneUser = await db.query('SELECT * FROM personbases where id = $1', [id])
        res.json(oneUser.rows[0])
    }
    async updateUser(req, res) {
        const {id, firstName, secondName} = req.body
        const user = await db.query('UPDATE personbases set firstName = $1, secondName = $2 where id = $3 RETURNING *', [firstName, secondName, id])
        res.json(user.rows[0])
    }
    async updatePassword(req, res) {
        //переписать для сравнения паролей старых. Сейчас при любом старом пароле н меняет.
        const {id, newPassword} = req.body
        const user = await db.query('UPDATE personbases set passwords = $1 where id = $2 RETURNING *', [newPassword, id])
        res.json(user.rows[0])
    }
        
    
    async deleteUser(req, res) {
        const id = req.params.id
        const deleteUser = await db.query('DELETE FROM personbases where id = $1', [id])
        res.json(deleteUser)
    }
}

module.exports = new UserController()