let MockAdapter = require('axios-mock-adapter');
let chai = require('chai');
const expect = chai.expect;
import { describe, it } from 'mocha';
import JobService from '../../services/JobService';
import axiosInstance from '../../config';
import { Job } from '../../models/Job';
import { JobCapabilities } from '../../models/JobCapabilities';
let mock = new MockAdapter(axiosInstance);

let jobService = new JobService();

const job = [
    {
        jobId: 1,
        jobName: 'Software Engineer',
        jobCapabilityId: 1
    }
];

describe('JobService', function () {
    it('getJobs method should return an array of jobs when API returns a Response 200', async () => {
        mock.onGet('/api/jobs').reply(200, job);

        let result:Job[] = await jobService.getJobs();

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(job[0]);
    });

    it('getJobs method should throw an error when API displays a non-200 status', async () => {
        mock.onGet('/api/jobs').reply(new Error('Could not get jobs'));
        let error:string;
        try {
            await jobService.getJobs();
        } catch (e) {
            error = e;
        }
        expect(String(error)).to.equal('Error: Could not get jobs');
    });

    it('getJobCapabilities should return an array of job capabilities array when API returns a Response 200', async () => {
        mock.onGet('/api/job-capabilities').reply(200, job);

        let result:JobCapabilities[] = await jobService.getJobCapabilities();

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(job[0]);
    });

    it('getJobCapabilities method should throw an error when API displays a non-200 status', async () => {
        mock.onGet('/api/job-capabilities').reply(new Error('Could not get job capabilities'));
        let error:string;
        try {
            await jobService.getJobCapabilities();
        } catch (e) {
            error = e;
        }
        expect(error).to.deep.equal(new Error('Could not get job capabilities'));
    });

});

