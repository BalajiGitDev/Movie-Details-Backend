import express from "express";
import {
    createUser,
    generateHashedPassword,
    getUserByName
} from "../services/user.service.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async function (request, response) {
    const { username, password } = request.body;

    const userFromDB = await getUserByName(username);

    if (userFromDB) {
        response.status(400).send({ message: "User already exists" })
    }
    else if (password.length < 8) {
        response.status(400).send({ message: "Password must be 8 characters" })
    }
    else {
        const hashedPassword = await generateHashedPassword(password);
        const result = await createUser({
            username: username,
            password: hashedPassword,
        });
        response.send(result)
    }
});

router.post("/login", async function (request, response) {
    const { username, password } = request.body;

    const userFromDB = await getUserByName(username);

    if (!userFromDB) {
        response.status(401).send({ message: "Invalid Credentials" });
    }
    else {
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);

        if (isPasswordCheck) {
            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
            response.send({ message: "Successfully Logged In", token: token })
        }
        else {
            response.status(401).send({ message: "Invalid Credentials" })
        }

    }



});

export default router;