import express from 'express';
const router = express.Router();


router.get('/get/api/currentuser',(req,res)=>{
    res.send('hi');
});

export {router as currentUserRouter};