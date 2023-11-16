import axiosInstance from '../config';
import { Job } from '../models/Job';
import { JobCapabilities } from '../models/JobCapabilities';

export default class JobService {
    async getJobs (): Promise<Job[]> {
        try{
            const response = await axiosInstance.get('/api/jobs');
            return response.data;
        } catch (e) {
            throw new Error('Could not get jobs');
        }
    }

    async getJobCapabilities (): Promise<JobCapabilities[]> {
        try {
            const response = await axiosInstance.get('/api/job-capabilities');
            return response.data;
        } catch (e) {
            throw new Error('Could not get job capabilitie')
        }
    }
}