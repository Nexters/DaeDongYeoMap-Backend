import { Module } from '@nestjs/common';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { PlaceModule } from './place/place.module';
import { SpotModule } from './spot/spot.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { StickerModule } from './sticker/sticker.module';
import { SharedModule } from './shared/shared.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      debug: false,
      playground: true,
      introspection: true,
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions?.exception?.response?.message || error.message,
        };

        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],

      useFactory: async (cfs: AppConfigService) => {
        return {
          uri: await cfs.getDB(),
          useNewUrlParser: true,
        };
      },
      inject: [AppConfigService],
    }),
    PlaceModule,
    SpotModule,
    StickerModule,
    CourseModule,
    UserModule,
    SharedModule,
  ],
  // controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
