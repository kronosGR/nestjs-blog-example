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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('{/:id}')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
  ) {
    console.log('Id:', id);
    console.log('limit:', limit);
    console.log('page :', page);
    return 'This action returns all users';
  }

  // @Get('/:id')
  // public getUser(@Param() params: any, @Query() query: any) {
  //   console.log('Query:', query);
  //   return 'User for id ' + params.id;
  // }

  @Post()
  public createUser(
    @Body() request: any,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    console.log('IP:', ip);
    console.log(request);
    console.log(headers);
    return 'This action adds a new user';
  }
}
