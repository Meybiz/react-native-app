const express = require("express")
const User = require('./signin')
const router = express.Router()

// Аутентификация пользователя
router.post("/signin", async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})
// Регистрация пользователя
router.post('/signup', async (req, res) => {
  const {email, password, date, fullName} = req.body
  try {
    const exist = await User.findOne({email})
    if(exist) {
      res.status(400).json({error: "Пользователь существует"})
    }

    const newUser = new User({
      email,
      password,
      fullName,
      date,
      coin: 0
    })

    await newUser.save()
    res.json({message: "Reg Succses", user: newUser})
  } catch (err) {
    console.error(err, "ERRROOOOOR")
    res.status(500).json({error: 'Server Error'})
  }
})

router.post('/update', async (req, res) => {
  const {email, oldPassword, newPassword} = req.body

  try {
    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({error: "Пользлватель не найден"})
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({error: "Совпадение пароля"})
    }

    user.password = newPassword
    await user.save()
    res.json({message: "Пароль изменен успешно"})
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "Ошибка в сервере"})
  }
})

module.exports = router