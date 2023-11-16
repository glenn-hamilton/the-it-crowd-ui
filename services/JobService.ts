import axiosInstance from '../config';
import { Job } from '../models/Job';

export default class JobService {
    async getJobs(): Promise<Job[]> {
        try{
            const response = await axiosInstance.get('/api/jobs');
            return response.data;
        } catch(e){
            console.error(e);
            throw new Error('Could not get jobs');
        }
    }
}