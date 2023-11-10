import { Request, Response, Application } from "express";
import { Job } from "../models/Job";
import JobService from "../services/JobService";

let jobService = new JobService();

module.exports = function(app: Application) {

    app.get('/jobs', async (req,res)=>{
        let jobs: Job[];

        try {
            jobs = await jobService.getJobs();
        } catch (e) {
            console.error(e);
            jobs = [];
        }
        res.render('JobTitles',{jobs:jobs})
    })

}