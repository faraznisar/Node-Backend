const HttpError = require('../models/http-error')
const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')
const User = require('../models/user')

const DUMMY_USERS = [{
    id: 'u1',
    name: 'Faraz',
    password: '12345',
    email: 'faraz@gmail.com'
}]
const getUsers = async (req, res, next) => {

    let users;

    try {

        users = await User.find({}, '-password') //-password will exclude password, email, name will include them - projection
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500
        );
        return next(error)
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) })
    // res.status(200).json({ users: DUMMY_USERS })

}

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Please provide a valid email address and password', 422))
    }
    const { name, email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signing up failed, Please try again later. ', 500
        )
        return next(error)
    }
    if (existingUser) {
        const error = new HttpError('User exists already, please Login instead.', 422
        )
        return next(error)
    }


    // const hasUsers = DUMMY_USERS.find(e => e.email === email)
    // if (hasUsers) {
    //     const error = new HttpError('Email already exists, try a different one!', 422
    //     )
    //     return next(error)
    // }
    const createdUser = new User({
        name,
        email,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg',
        password,
        places: []
    })
    try {

        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again.', 500)
        return next(error)
    }
    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
    // DUMMY_USERS.push(createdUser)
    // res.status(201).json({ user: createdUser })
}
const login = async (req, res, next) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signing up failed, Please try again later. ', 500
        )
        return next(error)
    }
    // const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    // console.log(identifiedUser);
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Could not identify the provided user, please provide valid credentials', 401
        )
        return next(error)
    }

    res.json({
        message: 'logged In',
        user: existingUser.toObject({ getters: true })
    })

}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login