"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesType = exports.userTypes = void 0;
const zod_1 = require("zod");
exports.userTypes = zod_1.z.object({
    username: zod_1.z.string().max(10).optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(10)
});
exports.notesType = zod_1.z.object({
    noteNo: zod_1.z.number().optional(),
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(2)
});
