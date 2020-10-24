import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        entities: [User],
        type: 'mariadb',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 3306),
        username: configService.get('DATABASE_USER', 'root'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
