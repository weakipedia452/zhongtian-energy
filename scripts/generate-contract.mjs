// 生成 PMS-ZT 委托生产加工合同（2026.01.01 - 2028.12.31）PDF 并上传对象存储
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import { S3Storage } from 'coze-coding-dev-sdk';

const OUT_DIR = '/tmp/contracts';
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT_FILE = `${OUT_DIR}/contract-pms-zt-commissioned-processing-2026-2028.pdf`;

const RED = '#c0392b';   // 信头红（延续旧合同风格）
const INK = '#1f2937';
const GRAY = '#6b7280';

const M = 55;
const PAGE_W = 595.28;
const CW = PAGE_W - M * 2;
const FOOT_Y = 796;

const CONTRACT_NO = '001/ZT-PMS/2026';
const CONTRACT_DATE = 'January 1, 2026';
const PARTY_A = 'PT. PARIT MUJUR SEJAHTERA';
const PARTY_A_ADDR = 'Jl. Dr. Soesilo No. 88 Dusun Padang Kandis, Membalong, Kab. Belitung';
const PARTY_B = 'PT. ZHONGTIAN NEW ENERGY INDONESIA';
const PARTY_B_ADDR = 'The Mansion Bougenville Tower Fontana lv27 Unit L2, Jl. Trembesi Blok D Kompleks Bandar Kemayoran, Jakarta Utara 14410';

const PREAMBLE = "In order to expand the market, as Party A's production capacity cannot meet market demand, Party A commissions Party B to process and produce products for Party A. The agreement is as follows:";

const CLAUSES = [
  'Party A and Party B shall provide relevant legally binding documents and sign the commissioned production and processing contract, which shall be filed with the competent local authorities.',
  'Party A will provide the main raw materials and packaging materials. The materials procured by Party B must meet the corresponding national and enterprise standards. The price will be agreed upon by both parties. The cost will be settled by Party A based on quantity and price.',
  "Without Party A's consent, Party B shall not produce products similar to Party A's.",
  "The variety and quantity of products will be determined based on market conditions and production will be scheduled according to sales. The production plan will be determined by personnel assigned by Party A. To reduce freight costs and lower expenses, upon receiving verbal or written authorization from Party A, Party B may help sell the products in the region specified by Party A under Party A's personnel supervision. Party A will recover the payments.",
  'Party B must produce qualified products according to Party A\'s requirements and deliver them on time. If Party B fails to meet the delivery quantity or time, it will be held responsible for any resulting losses.',
  'Due to the dynamic fluctuations in market prices and the large regional differences, the unit cost of the commissioned products will be calculated dynamically. Party A and Party B will determine the cost at any time based on the prices of major raw materials and market conditions.',
  "Party B must process the products according to the relevant national and enterprise standards. Non-compliant products are not allowed to leave the factory. If non-compliant products are caused by Party B's production, Party B will be held responsible. Party B's quality control department will conduct inspections and testing according to the standards on behalf of Party A.",
  'Party B shall not sell the products commissioned by Party A for processing. All products commissioned for processing will be sold by Party A.',
  'The cost of auxiliary materials procured during the commissioned processing will be initially borne by Party B. For each batch produced, Party A will settle the payment for that batch with Party B.',
  "Party B will provide Party A with good production conditions, hygienic conditions, and storage for finished and semi-finished products. Party B will provide free accommodation, water, and electricity for Party A's personnel stationed at the factory, and assist in resolving daily living issues. Party B will also be responsible for coordinating relationships with relevant functional departments.",
  'Based on production needs, Party B may deploy additional management personnel, technical staff, or other professionals as necessary.',
  'The quantity of commissioned products, varieties, and standards will be notified separately in writing. Both parties shall sign the written notification, which will be considered binding. If there is no written notice and Party B proceeds with production, Party A may file a complaint for infringement.',
  'This contract is valid from January 1, 2026, to December 31, 2028. If renewal is needed, both parties will negotiate separately. The contract will naturally terminate upon expiration.',
  'As long as Party B guarantees the quantity for Party A, Party A will not commission a second party for production in Indonesia.',
  'Any matters not covered in this contract will be resolved through mutual negotiation.',
  "This contract is made in four copies, with each party holding two copies. In case of disputes during the contract period, arbitration will be conducted in Party A's jurisdiction.",
];

const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true, info: { Title: 'Contract for Commissioned Production and Processing', Producer: PARTY_B } });
const ws = fs.createWriteStream(OUT_FILE);
doc.pipe(ws);

function addPage() {
  doc.addPage();
  // 信头：红色 Z.T* + 公司名 + 分割线（延续旧合同风格）
  doc.font('Helvetica-Bold').fontSize(24).fillColor(RED).text('Z. T*', M, 30);
  doc.font('Helvetica').fontSize(11.5).fillColor(RED).text('PT. ZHONGTIAN NEW ENERGY INDONESIA', M + 82, 42);
  doc.moveTo(M, 70).lineTo(PAGE_W - M, 70).lineWidth(1).strokeColor(RED).stroke();
  // 每页页脚：公司地址与邮箱（延续旧合同）
  doc.font('Helvetica').fontSize(7.5).fillColor(GRAY)
    .text('Add: The Mansion Bougenville Tower Fontana lv27 Unit L2 JL. Trembesi Blok D Kompleks Bandar Kemayoran-Jakarta Utara 14410.', M, FOOT_Y, { width: CW, align: 'center' })
    .text('Email: wenjiangxin@vip.126.com', M, FOOT_Y + 11, { width: CW, align: 'center' });
  return 96;
}

let y = addPage();

// 标题
doc.font('Helvetica-Bold').fontSize(16).fillColor(INK).text('Contract for Commissioned Production and Processing', M, y, { width: CW, align: 'center' });
y = doc.y + 10;
doc.font('Helvetica').fontSize(10).fillColor(INK)
  .text(`Contract No.: ${CONTRACT_NO}`, M, y, { width: CW, align: 'right' })
  .text(`Date: ${CONTRACT_DATE}`, M, doc.y, { width: CW, align: 'right' });
y = doc.y + 16;

// 双方信息
function party(label, name, addr, yPos) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(label, M, yPos);
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(name, M + 80, yPos, { continued: false });
  doc.font('Helvetica').fontSize(9.5).fillColor(INK).text(`Address: ${addr}`, M + 80, doc.y + 2, { width: CW - 80 });
  return doc.y + 12;
}
y = party('Party A:', PARTY_A, PARTY_A_ADDR, y);
y = party('Party B:', PARTY_B, PARTY_B_ADDR, y) + 6;

// 前言
doc.font('Helvetica').fontSize(10).fillColor(INK).text(PREAMBLE, M, y, { width: CW, align: 'justify', lineGap: 3 });
y = doc.y + 14;

// 条款（自动翻页）
function clause(num, text, yPos) {
  const h = doc.font('Helvetica').fontSize(10).heightOfString(text, { width: CW - 30, lineGap: 3 });
  if (yPos + h + 14 > FOOT_Y - 24) {
    yPos = addPage();
  }
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${num}.`, M, yPos, { width: 26 });
  doc.font('Helvetica').fontSize(10).fillColor(INK).text(text, M + 30, yPos, { width: CW - 30, align: 'justify', lineGap: 3 });
  return doc.y + 13;
}
CLAUSES.forEach((c, i) => { y = clause(i + 1, c, y); });

// 签署区
y += 24;
if (y + 190 > FOOT_Y - 24) y = addPage();
const colW = (CW - 40) / 2;
const xB = M + colW + 40;
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(`Party A: ${PARTY_A}`, M, y, { width: colW });
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(`Party B: ${PARTY_B}`, xB, y, { width: colW });
y += 30;
doc.font('Helvetica').fontSize(10).fillColor(INK).text('Sign:', M, y).text('Sign:', xB, y);
y += 58;
doc.font('Helvetica').fontSize(10).fillColor(INK).text('Address:', M, y).text('Address:', xB, y);
y += 24;
doc.font('Helvetica').fontSize(10).fillColor(INK).text('Date: 1/Jan/2026', M, y).text('Date: 1/Jan/2026', xB, y);

doc.end();
await new Promise((r) => ws.on('finish', r));
console.log('generated:', OUT_FILE, (fs.statSync(OUT_FILE).size / 1024).toFixed(1) + 'KB');

// 上传对象存储
const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});
const key = await storage.uploadFile({
  fileContent: fs.readFileSync(OUT_FILE),
  fileName: 'contracts/contract-pms-zt-commissioned-processing-2026-2028.pdf',
  contentType: 'application/pdf',
});
const url = await storage.generatePresignedUrl({ key, expireTime: 604800 });
console.log(JSON.stringify({ key, url }));
