const cloudflareR2 = (env) =>
  process.env.NODE_ENV === "production"
    ? {
        provider: "strapi-provider-cloudflare-r2",
        providerOptions: {
          accessKeyId: env("CF_ACCESS_KEY_ID"),
          secretAccessKey: env("CF_ACCESS_SECRET"),
          /**
           * `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
           */
          endpoint: env("CF_ENDPOINT"),
          params: {
            Bucket: env("CF_BUCKET"),
          },
          /**
           * Set this Option to store the CDN URL of your files and not the R2 endpoint URL in your DB.
           * Can be used in Cloudflare R2 with Domain-Access or Public URL: https://pub-<YOUR_PULIC_BUCKET_ID>.r2.dev
           * This option is required to upload files larger than 5MB, and is highly recommended to be set.
           * Check the cloudflare docs for the setup: https://developers.cloudflare.com/r2/data-access/public-buckets/#enable-public-access-for-your-bucket
           */
          cloudflarePublicAccessUrl: env("CF_PUBLIC_ACCESS_URL"),
          /**
           * Sets if all assets should be uploaded in the root dir regardless the strapi folder.
           * It is useful because strapi sets folder names with numbers, not by user's input folder name
           * By default it is false
           */
          pool: false,
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      }
    : {};

export default ({ env }) => ({
  upload: {
    config: {
      ...cloudflareR2(env),
      breakpoints: {
        xxlarge: 1440, // 或者更大，适合超大显示器和电视
        xlarge: 1280, // 大桌面显示器
        large: 1024, // iPad Pro 横屏 或 笔记本电脑
        medium: 768, // iPad 竖屏 或 大尺寸平板
        small: 480, // 手机横屏 或 小尺寸平板
        xsmall: 320, // 经典手机竖屏 （iPhone 5s 等）
      },
    },
  },
});
