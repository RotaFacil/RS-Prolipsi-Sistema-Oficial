import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { SigmeModule } from "./sigme/sigme.module";
import { ConnectorsModule } from "./connectors/connectors.module";
import { AdsModule } from "./ads/ads.module";
import { AttributionModule } from "./attribution/attribution.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "production" ? undefined : ".env",
      cache: true,
      load: [() => ({ jwt_secret: process.env.JWT_SECRET || 'default_secret' })],
    }),
    HealthModule,
    SigmeModule,
    ConnectorsModule,
    AdsModule,
    AttributionModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
