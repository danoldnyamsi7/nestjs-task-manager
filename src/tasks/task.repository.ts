import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { Repository, UpdateResult } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksRpository {
    constructor(@InjectRepository(Task) private $repository: Repository<Task>) { }

    async getTasks(): Promise<Task[]> {

        let tasks = this.$repository.find();

        return tasks;
    }

    async getTask(id: string): Promise<Task> {
        try {
        
            let task = await this.$repository.findOneBy({id})
            
            if (!task) {
                console.log('task does not exist');
                return null;
            }
            return task;

        } catch (error) {
            return error;
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        console.log(createTaskDto);
        const {title, desc }= createTaskDto;
        let task = this.$repository.create({title, desc})
        console.log(task, 'from create');
        let save = await this.$repository.save(task)
        console.log(save, 'from create');
        return save;
    }

    async updateTask(id:string ,updateTaskDto: UpdateTaskDto):Promise<UpdateResult>{
        try {
            let update = await this.$repository.update(id, updateTaskDto);
            return update;
        } catch (error) {
            return error;
        }
        
        
    }

    async deleteTask(id:string):Promise<{}>{
        await this.$repository.delete(id);
        return {message: 'task successfuly deleted '};
    }

    async deleteTasks():Promise<{}>{
        try {
            await this.$repository.delete({});
            return {message: 'tasks successfuly deleted '};            
        } catch (error) {
            return error
        }

    }

}