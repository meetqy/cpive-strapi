import type { StrapiApp } from "@strapi/strapi/admin";
import type {
  BulkActionComponent,
  DescriptionReducer,
} from "@strapi/content-manager/strapi-admin";
import { BatchAddTagsButton } from "./components/batch-add-tags";

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // "zh-Hans",
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    app
      .getPlugin("content-manager")
      .apis.addBulkAction(
        (
          actions:
            | DescriptionReducer<BulkActionComponent>
            | BulkActionComponent[]
        ) => {
          return [BatchAddTagsButton, ...actions];
        }
      );
  },
};
