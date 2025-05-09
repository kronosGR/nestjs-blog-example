import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-Users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // D. Injection Step 3

  @Get('{/:id}')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users with optional id, limit and page',
  })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: false,
    description: 'Get user by id',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit the number of users returned',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page you want to return',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Users found',
  })
  public getUsers(
    @Param('id') getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  // @Get('/:id')
  // public getUser(@Param() params: any, @Query() query: any) {
  //   console.log('Query:', query);
  //   return 'User for id ' + params.id;
  // }

  @Post()
  public createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
