import tryCatch from "./util/tryCatch.js";
import Drive from "../models/Drive.js";

export const createDrive = tryCatch(async (req,res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;

    const newDrive = new Drive({...req.body,uid,uName,uPhoto})
    await newDrive.save()
    res.status(201).json({ success: true, result: newDrive });
})

export const getDrives = tryCatch(async (req,res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    console.log("getDrives",uid)
    const drives = await Drive.find({uid})
    console.log("getDrivesList by user", drives)
    res.status(200).json({ success: true, result: drives });
})

export const updateDrive = tryCatch(async (req,res) => {
    // const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    // console.log(uid)
    const updatedDrive = await Drive.findByIdAndUpdate(req.params.driveId,req.body, {new:true})
    console.log("putDriveBy drive id", updatedDrive)
    res.status(200).json({ success: true, result: updatedDrive });
})

export const deleteDrive = tryCatch(async (req,res) => {
    // extract id and delete
    const {_id} = await Drive.findByIdAndDelete(req.params.driveId)
    res.status(200).json({ success: true, result: {_id} });
})