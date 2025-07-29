import { Module } from "@nestjs/common";
import * as path from "path";
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import { OnModuleInit } from "@nestjs/common";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(process.cwd(), "src/i18n/"),
        watch: true,
      },
      resolvers: [
        new HeaderResolver(["x-lang"]),
        AcceptLanguageResolver,
        { use: QueryResolver, options: ["lang"] },
      ],
      typesOutputPath: path.join(
        process.cwd(),
        "/src/i18n/generated/i18n.generated.ts",
      ),
      disableMiddleware: true,
    }),
  ],
  controllers: [],
})
export class I18nConfigModule implements OnModuleInit {
  onModuleInit() {}
}
