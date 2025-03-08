"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDashMiddleware = userDashMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
function userDashMiddleware(req, res, next) {
    const token = req.cookies.token;
    const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    console.log(token);
    if (!verified) {
        res.redirect("/login/signup");
    }
    next();
}
