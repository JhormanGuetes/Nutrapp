const User = require('../models/user.model');
const express = require('express');

exports.add = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({ ok: true, message: 'Nutricionista agregado con éxito.' })
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ ok: false, message: 'Verifique la información del usuario.' });

        res.status(400).json({ ok: false, message: 'No se pudo ingresar al usuario.' });
    }
}

exports.list = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({ ok: true, user })
    } catch (error) {
        res.status(400).json({ ok: false, error });
    }
}

exports.auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) return res.status(400).json({ ok: false, message: "Hay campos vacíos" });
        else {
            const newUser = new User();
            const userExists = await newUser.emailExists(email);

            if (userExists) {
                const userFound = await User.findOne({ email });

                console.log(userFound);
                console.log(userFound.password);

                const passCorrect = await newUser.isCorrectPassword(password, userFound.password);
                if (passCorrect) {
                    req.session.user = userFound;
                    return res.status(200).json({ ok: true, message: 'Usuario loagueado', user: userFound });
                }
            }
            res.status(400).json({ ok: false, message: 'Email o contraseña incorrecto.' });
        }
    } catch (error) {
        res.status(400).json({ ok: false, error });
    }
}

exports.register = async (req, res) => {
    try {
        const user = req.body;
        if (!user.name || !user.password || !user.email) return res.status(200).json({ ok: false, message: 'Hay campos vacíos.' });
        else {
            const newUser = new User(user);
            const exists = await newUser.emailExists(newUser.email);
            if (exists) return res.status.json({ ok: false, message: 'El usuario ya existe.' });

            await newUser.save();
            res.json({ ok: true, message: 'El asuario fue registrado', user: newUser });
        }
    } catch (error) {
        if(error.code === 11000) res.status(400).json({ok: false, message: "Se ingresaron datos incorrectos."});
        
        res.status(400).json({ ok: false, message: "No se puede registrar" });
    }
}