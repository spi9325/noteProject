"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = tokenMiddleware;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const client = new client_1.PrismaClient();
function tokenMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const authToken = req.headers['authorization']!
            const authToken = req.cookies.token;
            const token = jsonwebtoken_1.default.verify(authToken, JWT_SECRET);
            const users = yield client.user.findFirst({
                where: {
                    email: token.email
                }
            });
            if (token) {
                req.email = token.email;
                req.userid = users === null || users === void 0 ? void 0 : users.id;
                req.username = (users === null || users === void 0 ? void 0 : users.username) || (users === null || users === void 0 ? void 0 : users.email);
                next();
            }
        }
        catch (error) {
            res.status(401).json({
                error: "Unauthorize User"
            });
        }
    });
}
