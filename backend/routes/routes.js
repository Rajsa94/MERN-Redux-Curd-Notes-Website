const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// components all routes
const UserCompnents = require('../components/userComponet')
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.post('/register', UserCompnents.register)
router.post('/login', UserCompnents.postlogin)

// notes create route
router.post('/noteregister',auth, UserCompnents.noteregister)
router.get('/getnote',auth, UserCompnents.getNotes)
router.get('/edit/:id', UserCompnents.getNoteById)
router.post('/edit/:id', UserCompnents.UpdateNote)
router.delete('/delete/:id', UserCompnents.DeleteNote)
router.get('/logout', UserCompnents.Logout)



module.exports = router;