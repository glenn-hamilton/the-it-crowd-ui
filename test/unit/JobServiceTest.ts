var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
import { describe, it } from "mocha";
import JobService from "../../services/JobService";
import axiosInstance from "../../config";

var mock = new MockAdapter(axiosInstance);

var jobService = new JobService();

const job = {
    jobId: 1,
    jobName: "Software Engineer"
}

describe('JobService', function () {
    describe('getJobs', function () {
      it('should return an array of jobs from the API', async () => {
        mock.onGet("/api/jobs").reply(200, [job]);

        var result = await jobService.getJobs();

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(job);
      })

      it('should throw an error when the API returns a non-200 status', async () => {
       
       
        mock.onGet("/api/jobs").reply(new Error('Could not get jobs'));
        var error;
        try {
          await jobService.getJobs();
        } catch (e) {
          error = e;
        }
        expect(String(error)).to.equal("Error: Could not get jobs");
      })
    })
})

