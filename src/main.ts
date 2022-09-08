import { CreateOptions, CubejsServerCore, DatabaseType } from "@cubejs-backend/server-core";
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const dbType: DatabaseType = "mysql"
  const options: CreateOptions = {
    dbType,
    logger: (msg: string, params: any) => {
      console.log(`${msg}: ${JSON.stringify(params)}`);
    },
    schemaPath: join('assets', 'schema'),
  };

  const core = CubejsServerCore.create(options);

  const server: express.Application = express();

  core.initApp(server)

	const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  await app.init();
  await app.listen(4_000);
}
bootstrap();
