import { Request, Response, Application } from "express";
import { Job } from "../models/Job";
const jobService = require('../services/JobService')

module.exports = function(app: Application) {

    app.get('/jobs', async (req,res)=>{
        let jobs: Job[];

        try {
            jobs = await jobService.getJobs();
        } catch (e) {
            console.error(e);
        }
        res.render('JobTitles',{jobs:jobs})
    })

}