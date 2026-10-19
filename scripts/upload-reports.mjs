// 上传环境报告 PDF 到对象存储并生成下载链接
import { S3Storage } from 'coze-coding-dev-sdk';
import fs from 'node:fs';

const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

const files = [
  { path: '/tmp/environment-reports/environment-report-zh.pdf', name: 'reports/environment-report-zh.pdf' },
  { path: '/tmp/environment-reports/environment-report-en.pdf', name: 'reports/environment-report-en.pdf' },
  { path: '/tmp/environment-reports/environment-report-id.pdf', name: 'reports/environment-report-id.pdf' },
];

for (const f of files) {
  const content = fs.readFileSync(f.path);
  const key = await storage.uploadFile({
    fileContent: content,
    fileName: f.name,
    contentType: 'application/pdf',
  });
  const url = await storage.generatePresignedUrl({ key, expireTime: 604800 }); // 7 天有效
  console.log(JSON.stringify({ file: f.name, key, url }));
}
