import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { PaymentsModule } from "./payments/payments.module";
import { WalletModule } from "./wallet/wallet.module";
import { GroupsModule } from "./groups/groups.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "production" ? undefined : ".env",
      cache: true
    }),
    HealthModule,
    PaymentsModule,
    WalletModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
