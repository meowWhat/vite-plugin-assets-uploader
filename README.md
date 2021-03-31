# vite-plugin-assets-uploader

Helps you upload the packaged assets of Vite to the server

# install

```bash
yarn add vite-plugin-assets-uploader --dev
```

# exapmle

```typescript
import { defineConfig } from "vite";
import uploader from "vite-plugin-assets-uploader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uploader({
      enableAlioss: true,
      ossOptions: {
        bucket: "xxx",
        accessKeyId: "xxxx",
        accessKeySecret: "xxxxx",
        region: "xxxx",
        roleArn: "xxxxx",
      },
    }),
  ],
  base: "oss path",
});
```

# custom

```typescript
import { defineConfig } from "vite";
import uploader from "vite-plugin-assets-uploader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uploader({
      userUpload: (filePath: string, content: Buffer) => {
        return new Promise((reslove) => {
          console.log(filePath, content);
          reslove(null);
        });
      },
    }),
  ],
});
```

# more

- There are two modes for uploading, one is custom and the other is provided by plugins

## internal

- Currently, only ALI-OSS is supported internally by the plug-in ,All contents under 'assetsDir' will be found and uploaded to the server

## custom

- All contents under 'assetsDir' will be found and pass to your callback function
- The plugin provides good task scheduling, and logging. You only need to provide the upload function

# roadmap

[ ] support `cos-nodejs-sdk-v5`
[ ] Optimizing Task Scheduling
[ ] Logging increases upload time
