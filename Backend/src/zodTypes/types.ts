import {z} from "zod"

export const userTypes = z.object({
    username:z.string().max(10).optional(),
    email:z.string().email(),
    password:z.string().min(5).max(10)
});

export const notesType = z.object({
    noteNo:z.number().optional(),
    title:z.string().min(2),
    description:z.string().min(2)
}); 