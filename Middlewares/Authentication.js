    import User from "../Models/UserModel.js";
    import jwt from 'jsonwebtoken'
    import dotenv from "dotenv";
    dotenv.config();

    export const Authentication = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById({
          _id: decoded.id,
        });
        if (user) {
          req.headers.id = decoded.id;
          next();
        } else {
          return res
            .status(401)
            .json({ status: false, message: "user not authorised" });
        }
        }else{
            return res.status(401).json({status: false, message: "user not authorised"})
        }
        
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Errors" });
    }
    };
