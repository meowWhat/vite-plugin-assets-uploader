# vite-plugin-assets-uploader

Helps you upload the packaged assets of Vite to the server

# usage

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
});
```
