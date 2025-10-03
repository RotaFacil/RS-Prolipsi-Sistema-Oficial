import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getServiceLogger } from "./common/logger";

const SERVICE_NAME = "api";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const logger = getServiceLogger(SERVICE_NAME);
  app.useLogger(logger);
  app.enableCors();

  const config = app.get(ConfigService);
  const databaseUrl = config.get<string>("DATABASE_URL") ?? process.env.DATABASE_URL;
  if (!databaseUrl) {
    const message = "Missing DATABASE_URL environment variable. Aborting start.";
    logger.error(message);
    throw new Error(message);
  }

  const port = Number(config.get<string>("PORT") ?? process.env.PORT ?? 3003);

  await app.listen(port, "0.0.0.0");
  logger.log(`service ${SERVICE_NAME} listening on port ${port}`);
}

bootstrap().catch((err) => {
  const logger = getServiceLogger(SERVICE_NAME);
  logger.error("Failed to bootstrap Nest application", err?.stack ?? err?.message);
  process.exit(1);
});
