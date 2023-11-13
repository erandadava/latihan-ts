import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { Tasks } from "../model/task.model";

export class TaskRepository{
    private logger: APILogger;
    private db: any = {};
    private taskRepository: any;

    constructor(){
        this.db = connect();
        this.logger = new APILogger();
        // for Dev
        this.db.sequelize.sync({force: true}).then(() => {
            console.log("Drop and re=sync DB");
        })

        this.taskRepository = this.db.sequelize.getRepository(Tasks)
    }

    async getTasks(){
        try {
            const tasks = await this.taskRepository.findAll();
            console.log(tasks)
            return { status: 200, data: tasks, message: 'Success' };
        } catch (error) {
            console.log(error);
            return [];
            return { status: 500, data: [], message: 'Internal Server Error'};
        }    
    }
    async createTask(task){
        let data = {}
        try {
            task.createDate = new Date().toISOString();
            data = await this.taskRepository.create(task)
        } catch (error) {
            this.logger.error("Error::" + error)
        }
        return data;
    }
    async updateTask(task){
        let data = {};
        try {
            task.updateddate = new Date().toISOString();
            data = await this.taskRepository.update({...task}, {
                where: {
                    id: task.id
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }
    async deleteTask(taskId){
        let data = {};
        try {
            data = await this.taskRepository.destroy({
                where: {
                    id: taskId
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }
}