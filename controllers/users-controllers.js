const HttpError = require('../models/http-error')
const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const DUMMY_USERS = [{
    id: 'u1',
    name: 'Faraz',
    password: '12345',
    email: 'faraz@gmail.com'
}]
const getUsers = (req, res, next) => {
    res.status(200).json({ users: DUMMY_USERS })

}

const signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Please provide a valid email address and password', 422)
    }

    const { name, email, password } = req.body

    const hasUsers = DUMMY_USERS.find(e => e.email === email)
    if (hasUsers) {
        throw new HttpError('Email already exists, try a different one!', 422)
    }
    const createdUser = {
        id: uuid(),
        name,
        password,
        email
    }

    DUMMY_USERS.push(createdUser)
    res.status(201).json({ user: createdUser })
}
const login = (req, res, next) => {
    const { email, password } = req.body
    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    console.log(identifiedUser);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify the provided user, please provide valid credentials', 401)
    }

    res.json({ message: 'logged In' })

}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login