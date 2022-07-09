import { IsDate, IsNotEmpty, isNotEmpty } from "class-validator";
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    desc: string;

}
