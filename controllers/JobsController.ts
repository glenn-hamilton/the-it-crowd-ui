import { Request, Response, Application } from 'express';
import { Job } from '../models/Job';
import JobService from '../services/JobService';
import { JobResponsibility } from '../models/JobResponsibility';

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
        let responsibilities: JobResponsibility;
        const title: string = 'Job';
        let cleanList = [];

        try {
            job = await jobService.getJobById(Number(id));
            responsibilities = await jobService.getResponsibilities(Number(id));

            if (responsibilities.responsibilityTextPoints != undefined) {

                let splitted = responsibilities.responsibilityTextPoints.split('^');

                for (let item in splitted) {
                    if (splitted[item] != '') {
                        cleanList.push(splitted[item].trim())
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
        res.render('JobById', { job, title, responsibilities, responsibilityPoints: cleanList });
    });
};