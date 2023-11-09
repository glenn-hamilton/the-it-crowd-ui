import axiosInstance from "../config";

export default class JobService {
    async getJobs(): Promise<any> {
    try{
        const response = await axiosInstance.get("/api/jobs");
        return response.data;
    } catch(e){
        throw new Error('Could not get jobs');
    }
}
}