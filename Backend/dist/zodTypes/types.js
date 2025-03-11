"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesType = exports.userTypes = void 0;
const zod_1 = require("zod");
exports.userTypes = zod_1.z.object({
    username: zod_1.z.string().max(10, "username max 10 char").optional(),
    email: zod_1.z.string().email("email format wrong"),
    password: zod_1.z.string().min(5, "the password min 5 char").max(10, "password max 10 char")
});
exports.notesType = zod_1.z.object({
    noteNo: zod_1.z.number().optional(),
    title: zod_1.z.string().min(2, "title min 2 letter"),
    description: zod_1.z.string().min(2, "description min 2 letter")
});
