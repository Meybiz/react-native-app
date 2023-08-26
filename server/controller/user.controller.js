const db = require('../db')
const bcrypt = require('bcrypt')
class UserController {

    async migratePasswords () {
        try {
            const usersMigrate = await db.query('SELECT id, passwords FROM personbases;')

            for (const users of usersMigrate.rows) {
                console.log(users.passwords)
                const hash = await bcrypt.hashSync(users.passwords, 10)
                await db.query('UPDATE personbases SET passwords = $1 WHERE id = $2', [hash, users.id])
            }

            console.log('Успешное хеширование')
        }
        catch (error) {
            console.error('Ошибка миграции:', error)
        }
    }
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

    async checkPassword (req, res) {
        try {
            const {passwords, phone} = req.body
            const user = await db.query('SELECT * FROM personbases WHERE phone = $1', [phone])
            if (user.rowCount === 0) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }
            const hashedPassword = user.rows[0].passwords;
            const match = await bcrypt.compareSync(passwords, hashedPassword);
            if (match){
                res.json(user.rows[0]);
            } else {
                res.status(401).json({ error: 'Неверный пароль' });
            }
        } catch (err) {
            console.error('Ошибка проверки пароля:', err)
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
        const {id, newPassword, oldPassword} = req.body
        const oneUser = await db.query('SELECT * FROM personbases where id = $1', [id])
        const match = await bcrypt.compare(oldPassword, oneUser.rows[0].passwords)

        if(!match) {
            return res.status(400).json({error: 'Неправильый старый пароль'})
        }
         else {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            const user = await db.query('UPDATE personbases set passwords = $1 where id = $2 RETURNING *', [hashedPassword, id])
            res.json(user.rows[0])
        }
        
    }
        
    
    async deleteUser(req, res) {
        const id = req.params.id
        const deleteUser = await db.query('DELETE FROM personbases where id = $1', [id])
        res.json(deleteUser)
    }
}

module.exports = new UserController()