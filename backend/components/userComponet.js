const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../Schema/userShema')
const passport = require('passport');
const Note = require('../Schema/notedSchema')

const securePassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        return hashPassword
    } catch (error) {
        console.log(error.message)
    }
}

const register = async (req, res) => {
    
    const password = await securePassword(req.body.password)

    const { name, email, } = req.body;

    if (!name || !email ||  !password ) {
        return res.status(422).json({ error: "plz filled the firs properly" })
    }
    try {

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "Email already Exits" })
        }
        const user = new User({ name, email,  password,  })
        const userRegister = await user.save()
        


        if (userRegister) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: req.session
                
                
                
              });
        }



    } catch (error) {

        console.log(error)
    }





}
const postlogin = (req, res, next) => {
    const { email, password } = req.body
    // Validate request 
    if (!email || !password) {
        // req.flash('error', 'All fields are required')
        return res.status(400).json({ error: "Email already Exits" })

    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // req.flash('error', info.message)


            return next(err)
        }
        if (!user) {
            // req.flash('error', info.message)

            return res.status(400).json({ error: "Email already Exits" })

        }
        req.logIn(user, (err) => {
            if (err) {
                // req.flash('error', info.message)


                return next(err)
            }

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: req.session
                
                
                
              });
        })
    })(req, res, next)
}
const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  };


const noteregister = async (req, res) => {
    const { title, content, category } = req.body;
    console.log(req.body)

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    console.log(note)

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }

}
const getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);
    
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  
   
  };

  const DeleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      await note.remove();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  };
  
  // @desc    Update a note
  // @route   PUT /api/notes/:id
  // @access  Private
  const UpdateNote = async (req, res) => {
    const { title, content, category } = req.body;
  
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
  
      const updatedNote = await note.save();
      res.redirect('/mynotes')
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  };
  const Logout = (req, res) => {
    try {
        req.session.destroy();
        return res.redirect("/login")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    register,
    postlogin,
    noteregister,
    getNotes,
    getNoteById,
    UpdateNote,
    DeleteNote,
    Logout
    
}