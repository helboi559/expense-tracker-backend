import { Router } from "express";
import { createDrive, deleteDrive, getDrives, updateDrive } from "../controllers/drives.js";
import auth from "../middleware/auth.js";

const drivesRouter = Router()
drivesRouter.post('/create-drive',auth, createDrive)
drivesRouter.get('/view-drives',auth,getDrives)
drivesRouter.patch('/:driveId',auth,updateDrive)
drivesRouter.delete('/:driveId',auth,deleteDrive)
export default drivesRouter