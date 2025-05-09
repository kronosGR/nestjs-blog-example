import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService], // D. Injection Step 2
  exports: [UsersService], // E. Exporting the service, only services can be exported
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])], // to avoid circular dependency
})
export class UsersModule {}
