import { Module } from "@nestjs/common";
import { AttributionController } from "./attribution.controller";

@Module({ controllers: [AttributionController] })
export class AttributionModule {}

