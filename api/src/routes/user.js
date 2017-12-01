const express = require('express')
const moment = require('moment')
const nodemailer = require('nodemailer');
const randtoken = require('rand-token');
const router = express.Router()

const User = require('../models/user')
const crypts = require('../utils/crypts');

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ email: email })
        .exec((err, result) => {
            if (err) {
                return res.status(400).send(err);
            }

            if (result) {
                return res.json({
                    error: 'E-mail already used.',
                    success: false,
                })
            }

            const user = new User();
            user.name = name;
            user.email = email;
            user.password = crypts.encrypt(password);

            user.save((err, result) => {
                if (err) {
                    return res.status(400).send(err)
                }

                return res.json({
                    result,
                    success: true,
                })
            })
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ email: email, password: crypts.encrypt(password) })
        .exec((err, user) => {
            if (user) {
                return res.json({
                    user,
                    success: true,
                })
            }

            return res.json({
                error: "Login faild.",
                success: false,
            })
        })
})

router.post('/login/social', (req, res) => {
    const { email } = req.body

    if (!email || !password) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ email: email })
        .exec((err, user) => {
            if (user) {
                return res.json({
                    user,
                    success: true,
                })
            }

            return res.json({
                error: "Login faild.",
                success: false,
            })
        })
})

router.post('/updateProfile', (req, res) => {
    const { _id, name, email, phone } = req.body

    if (!name || !email || !phone) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ _id: _id })
        .exec((err, user) => {

            if (err != null) {
                return res.json({
                    error: "Update faild.",
                    success: false,
                })
            } else if (user) {
                user.name = name;
                user.email = email;
                user.phone = phone;
                user.save((err, result) => {
                    if (err) {
                        return res.json({
                            error: "Update faild.",
                            success: false,
                        })
                    }

                    return res.json({
                        result,
                        success: true,
                    })
                })
            } else {

                return res.json({
                    error: "Update faild.",
                    success: false,
                })
            }
        })
})

router.post('/changePassword', (req, res) => {
    const { _id, currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ _id: _id, password: crypts.encrypt(currentPassword) })
        .exec((err, user) => {

            if (err != null) {
                return res.json({
                    error: "Update faild.",
                    success: false,
                })
            } else if (user) {
                user.password = crypts.encrypt(newPassword);
                user.save((err, result) => {
                    if (err) {
                        return res.json({
                            error: "Update faild.",
                            success: false,
                        })
                    }

                    return res.json({
                        result,
                        success: true,
                    })
                })
            } else {
                return res.json({
                    error: "Current password is not correct.",
                    success: false,
                })
            }
        })
})

router.post('/forgot', (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ email: email })
        .exec((err, user) => {

            if (err != null) {
                return res.json({
                    error: "Reset requst faild.",
                    success: false,
                })
            } else if (user) {
                const token = randtoken.generate(16);
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).send(err)
                    }

                    const smtpTrans = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'hellocryptostats@gmail.com',
                            pass: 'hellocryptostats123'
                        }
                    });
                    const mailOptions = {
                        to: user.email,
                        from: 'myemail',
                        subject: 'Cryptostats Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        req.headers.origin + '/resetPassword/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };

                    smtpTrans.sendMail(mailOptions, function (err) {
                        if (err) {
                            return res.json({
                                error: "Failed.",
                                success: false,
                            })
                        }
                        return res.json({
                            success: true,
                        })
                    });
                })

            } else {
                return res.json({
                    error: "No account with that address exists.",
                    success: false,
                })
            }
        })
})

router.post('/resetPassword/', (req, res) => {
    const { newPassword, token } = req.body

    if (!newPassword) {
        return res.status(422).json({
            error: 'All fields are required',
        })
    }

    User
        .findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        .exec((err, user) => {

            if (err != null) {
                return res.json({
                    error: "Reset password failed.",
                    success: false,
                })
            } else if (user) {
                user.password = crypts.encrypt(newPassword);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save((err, result) => {
                    if (err) {
                        return res.json({
                            error: "Reset password failed.",
                            success: false,
                        })
                    }

                    return res.json({
                        result,
                        success: true,
                    })
                })
            } else {
                return res.json({
                    error: "Password reset token is invalid or has expired.",
                    success: false,
                })
            }
        })
})

module.exports = router
