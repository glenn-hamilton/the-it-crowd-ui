import { Request, Response, Application } from 'express';
import { Job } from '../models/Job';
import JobService from '../services/JobService';
import { JobCapabilities } from '../models/JobCapabilities';
import { mergeObjectsByKey } from '../utils/common';

let jobService = new JobService();

module.exports = function(app: Application) {

    app.get('/jobs', async (req: Request, res: Response) => {
        let jobs: Job[];
        let capabilities: JobCapabilities[];
        const title:string= 'Job Roles';
        let correctIdx = [];

        try {
            jobs = await jobService.getJobs();

            capabilities = await jobService.getJobCapabilities();

            var mergedObjects = mergeObjectsByKey(capabilities, jobs, 'jobCapabilityId');

            for(let idx in mergedObjects) {
                let num = Number(idx);
                let item:any = mergedObjects[num];

                if ('jobName' in item) {
                    correctIdx.push(item);
                }
            }

        } catch (e) {
            console.error(e);
        }
        res.render('JobTitles',{jobs: correctIdx, title});
    });
};