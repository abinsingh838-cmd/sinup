import Users from "../db/models/users.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {

    try {

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        const { name, email, password } = req.body;

        console.log("req body :", req.body);

        if (!name || !email || !password) {
            res.status(400).json({ message: "all fields are required!" });
            return;
        }

        const findUser = await Users.findOne({ email });

        if (findUser) {
            res.status(400).json({ message: "user already exist ... pls login to continue" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await Users.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "user created successfully",
            data: { name, email }
        });
        return;

    } catch (err) {
        console.log("error :", err);

        res.status(400).json({
            message: err.message ? err.message : "something went wrong"
        });
    }
};

export default signUp;