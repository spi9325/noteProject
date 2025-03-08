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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoute = void 0;
const express_1 = require("express");
const tokenMiddeleware_1 = require("../middlewares/tokenMiddeleware");
const client_1 = require("@prisma/client");
const types_1 = require("../zodTypes/types");
const client = new client_1.PrismaClient();
exports.notesRoute = (0, express_1.Router)();
exports.notesRoute.post("/create", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseData = types_1.notesType.safeParse(req.body);
        if (parseData.success) {
            const email = req.email;
            const { title, description } = parseData.data;
            const userExistOrNot = yield client.user.findFirst({
                where: {
                    email
                }
            });
            if (userExistOrNot) {
                const success = yield client.$transaction((client) => __awaiter(void 0, void 0, void 0, function* () {
                    const note = yield client.notes.create({
                        data: {
                            title,
                            description,
                            userId: userExistOrNot.id
                        }
                    });
                    res.status(200).json({
                        message: "note Created",
                        note
                    });
                }));
            }
            else {
                res.status(401).json({
                    error: "User Not Exist"
                });
            }
        }
        else {
            res.status(400).json({
                error: "Invalid Inputs"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.notesRoute.get("/all", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const userExistOrNot = yield client.user.findFirst({
            where: {
                email
            }
        });
        if (userExistOrNot) {
            const allNotes = yield client.notes.findMany({
                where: {
                    userId: userExistOrNot.id
                }
            });
            if (allNotes.length > 0) {
                res.status(200).json(allNotes);
            }
            else {
                res.status(200).json([]);
            }
        }
        else {
            res.status(401).json({
                error: "user not found"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.notesRoute.patch("/update", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.userid;
        const parseData = types_1.notesType.safeParse(req.body);
        if (!parseData) {
            res.json({
                error: "bad input"
            });
        }
        const noteNo = (_a = parseData.data) === null || _a === void 0 ? void 0 : _a.noteNo;
        const { title, description } = parseData.data;
        if (id) {
            if (noteNo) {
                const updatedNote = yield client.notes.update({
                    where: {
                        noteNo
                    },
                    data: {
                        title,
                        description
                    }
                });
                if (updatedNote) {
                    res.status(200).json({
                        updatedNote,
                    });
                }
            }
            else {
                res.status(400).json({
                    error: "provide valid note No"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.notesRoute.delete("/delete", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userid;
        const noteNo = Number(req.query.noteNo);
        if (!noteNo) {
            res.status(404).json({
                error: "note no not provided"
            });
            return;
        }
        if (id) {
            const transaction = yield client.$transaction((client) => __awaiter(void 0, void 0, void 0, function* () {
                const deletedNote = yield client.notes.delete({
                    where: {
                        noteNo,
                        userId: id
                    }
                });
                if (deletedNote) {
                    res.status(200).json({
                        message: "deletion success"
                    });
                }
                else {
                    res.status(404).json({
                        error: "deletion fail"
                    });
                }
            }));
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.notesRoute.post("/view", tokenMiddeleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteNo = Number(req.query.noteNo);
        const userId = Number(req.userid);
        const note = yield client.notes.findFirst({
            where: {
                noteNo,
                userId
            }
        });
        if (note) {
            res.status(200).json(note);
        }
        else {
            res.status(404).json("not found");
        }
    }
    catch (error) {
        console.log(error);
    }
}));
