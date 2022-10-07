import { Router } from "express";
// import { auth } from "google-auth-library";
import { createRoom } from "../controllers/room.js";
import auth from "../middleware/auth.js";


const roomRouter = Router()
// console.log(createRoom)
//in case of post req
roomRouter.post('/',auth,createRoom)

export default roomRouter