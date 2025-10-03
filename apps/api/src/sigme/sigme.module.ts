import { Module } from "@nestjs/common";
import { SigmeController } from "./sigme.controller";

@Module({ controllers: [SigmeController] })
export class SigmeModule {}

