import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: 'master',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      entities:[User, Task]
      
    }),
    UsersModule,
    TasksModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
