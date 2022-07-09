import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async createUser(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  getAllTaks(): Promise<Task[]> {
    return this.tasksService.getAll()
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const update = await this.tasksService.update(id, updateTaskDto);
    return update;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{}> {
    this.tasksService.deleteTask(id);
    return { message: "task deleted successfully" }
  }

  @Delete()
  async deleteTasks(): Promise<{}> {

    try {
      let tasks = await this.tasksService.getAll();
      if (tasks.length === 0) {
        return { message: "already empty" }
      } else {
        await this.tasksService.deleteTasks()
        console.log(tasks)
        return { message: "tasks deleted" };
      }
    } catch (error) {
      return error;
    }
  }
}
