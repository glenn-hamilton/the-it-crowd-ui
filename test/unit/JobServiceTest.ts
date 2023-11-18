let MockAdapter = require('axios-mock-adapter');
let chai = require('chai');
const expect = chai.expect;
import { describe, it } from 'mocha';
import JobService from '../../services/JobService';
import axiosInstance from '../../config';
import { Job } from '../../models/Job';
import { JobResponsibility } from '../../models/JobResponsibility';
let mock = new MockAdapter(axiosInstance);

let jobService = new JobService();

const job = [
    {
        jobId: 1,
        jobName: 'Software Engineer'
    }
];

const jobResponsibility = {
    "responsibilityId": 1,
    "responsibilityTextBody": "As a Trainee Software Engineer with Kainos...",
    "responsibilityTextPoints": "^ Contribute to developing high quality solutions which impact the lives of users worldwide..."
}

describe('JobService', function () {
    it('Get all jobs should return an array of jobs from the API', async () => {
        mock.onGet('/api/jobs').reply(200, job);

        let result:Job[] = await jobService.getJobs();

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(job[0]);
    });

    it('should throw an error when the API returns a non-200 status', async () => {
        mock.onGet('/api/jobs').reply(new Error('Could not get jobs'));
        let error:string;
        try {
            await jobService.getJobs();
        } catch (e) {
            error = e;
        }
        expect(String(error)).to.equal('Error: Could not get jobs');
    });
});

describe('JobServiceResponsibilities', function () {

    it('Get job responsibilities with a valid job id, should return a valid JobResponsibility Object',async () => {
        let searchId = 1;

        mock.onGet('/api/job-responsibility/' + searchId).reply(200, jobResponsibility);

        let result: JobResponsibility = await jobService.getResponsibilities(searchId);

        expect(result['responsibilityId']).to.equal(jobResponsibility['responsibilityId'])
        expect(result['responsibilityTextBody']).to.equal(jobResponsibility['responsibilityTextBody'])
        expect(result['responsibilityTextPoints']).to.equal(jobResponsibility['responsibilityTextPoints'])
    })

    it('Get job responsibilities with a invalid job id, should throw Error: Could not get job responsibilities',async () => {
        let searchId = -1;
        let expectedError = 'Could not get job responsibilities'
        let error: any;

        mock.onGet('/api/job-responsibility/' + searchId).reply(400, new Error(expectedError));

        try {
            error = await jobService.getResponsibilities(searchId);
        } catch (e) {
            error = e;
        }

        expect(String(error)).to.equal('Error: ' +expectedError);
    })
});
