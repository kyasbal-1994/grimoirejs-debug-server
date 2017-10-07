import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap().catch(e => console.error);
