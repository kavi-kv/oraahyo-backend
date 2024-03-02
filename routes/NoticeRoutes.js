
import express from "express"
import { addNewNotice, getActiveNotice,toggleNotice, updateNotice,deleteNotice } from "../Controllers/noticeController.js"
const noticeRouter = express.Router();


noticeRouter.post('/addNotice', addNewNotice);
noticeRouter.get('/notice/active', getActiveNotice)
noticeRouter.put('/update/notice/:id', updateNotice)
noticeRouter.delete('/delete/notice/:_id', deleteNotice)
noticeRouter.put('/activate/notice/:id', toggleNotice)




export default noticeRouter;