import { TaskRepository } from "../repository/task.repository";
import { APILogger } from '../logger/api.logger';

export class TaskService{
    private taskRepository: TaskRepository
    private logger: APILogger;

    constructor(){
        this.logger = new APILogger();
        this.taskRepository = new TaskRepository();        
    }

    async getTasks() {
        try {
            const result = await this.taskRepository.getTasks();
            this.logger.info('Controller: getTasks', null);
            return result;
        } catch (error) {
            this.logger.error('Controller Error::' + error);
            return { status: 500, data: [], message: 'Internal Server Error' };
        }
    }

    async createTask(task) {
        return await this.taskRepository.createTask(task);
    }

    async updateTask(task) {
        return await this.taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await this.taskRepository.deleteTask(taskId);
    }
}