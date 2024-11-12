import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { Config } from './entities/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<Config>) {
        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: configService.get("DATABASE_PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASS"),
          database: configService.get("DATABASE_NAME"),
          synchronize: true,
          entities: [News],
          migrations: ["dist/migrations/**/*{.ts,.js}"],
        };
      },
    }),
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
