import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksRpository } from './task.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(private TaskRepository: TasksRpository) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, desc } = createTaskDto;
      // createTaskDto.date = new Date();
      let task = await this.TaskRepository.createTask({title, desc });
      return task;

    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.TaskRepository.getTasks();
      return tasks;
    } catch (error) {
      return error;
    }
  }

  async getTask(id: string): Promise<Task> {
    try {
      const task = await this.TaskRepository.getTask(id);
      return task;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {

    try {
      let task = await this.TaskRepository.getTask(id);
      if (!task) throw new NotFoundException('task not found');
      let updated = await this.TaskRepository.updateTask(id, updateTaskDto);
      return updated;
    } catch (error) {
      return error;
    }

  }

  async deleteTask(id: string):Promise<{}> {
      try {
        await this.TaskRepository.deleteTask(id);
        return {message: "task deleted successfuly"}
      } catch (error) {
        return error;
      }
  }

  async deleteTasks():Promise<{}> {
    try {
      await this.TaskRepository.deleteTasks();
      return {message: "tasks deleted successfuly"}
    } catch (error) {
      return error;
    }
}
}
