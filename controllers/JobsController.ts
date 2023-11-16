import { Request, Response, Application } from 'express';
import { Job } from '../models/Job';
import JobService from '../services/JobService';

let jobService = new JobService();

module.exports = function (app: Application) {

    app.get('/jobs', async (req: Request, res: Response) => {
        let jobs: Job[];
        const title: string = 'Job Roles';

        try {
            jobs = await jobService.getJobs();
        } catch (e) {
            console.error(e);
        }
        res.render('JobTitles', { jobs, title });
    });


    app.get('/jobs/:id', async (req: Request, res: Response) => {
        const id = req.params.id; 
        let job: Job;
        const title: string = 'Job';

        try {
            job = await jobService.getJobById(Number(id));
        } catch (e) {
            console.error(e);
        }
        res.render('JobById', { job, title });
    });
};