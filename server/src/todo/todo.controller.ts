import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('todo')
@UseGuards(new AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/all')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post('/create')
  createTodo(@Body('content') content: Extract<TodoDTO, 'content'>) {
    return this.todoService.createTodo(content);
  }

  @Patch('/update')
  updateTodo(@Query('id') id: string, @Body() data: Partial<TodoDTO>) {
    return this.todoService.updateTodo(id, data);
  }

  @Delete('/delete')
  deleteTodo(@Query('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}