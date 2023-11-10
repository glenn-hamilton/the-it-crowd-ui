let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');
let chai = require('chai');  
const expect = chai.expect;
import { describe, it } from "mocha";
import JobService from "../../services/JobService";
import axiosInstance from "../../config";
import { Job } from "../../models/Job";
let mock = new MockAdapter(axiosInstance);

let jobService = new JobService();

const job = [
  {
      jobId: 1,
      jobName: "Software Engineer"
  }
]

describe('JobService', function () {
      it('Get all jobs should return an array of jobs from the API', async () => {
        mock.onGet("/api/jobs").reply(200, job);

        let result:Job[] = await jobService.getJobs();

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(job[0]);
      })

      it('should throw an error when the API returns a non-200 status', async () => {
        mock.onGet("/api/jobs").reply(new Error('Could not get jobs'));
        let error;
        try {
          await jobService.getJobs();
        } catch (e) {
          error = e;
        }
        expect(String(error)).to.equal("Error: Could not get jobs");
      })
    })

