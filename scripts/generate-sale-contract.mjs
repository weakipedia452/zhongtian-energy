// 生成 PMS-ZT 石英砂购销合同（Silica Sand Sale & Purchase, 2026.01.01 - 2028.12.31）PDF 并上传对象存储
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import { S3Storage } from 'coze-coding-dev-sdk';

const OUT_DIR = '/tmp/contracts';
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT_FILE = `${OUT_DIR}/contract-pms-zt-silica-sale-purchase-2026-2028.pdf`;

const RED = '#c0392b';   // 信头红（延续旧合同风格）
const INK = '#1f2937';
const GRAY = '#6b7280';

const M = 55;
const PAGE_W = 595.28;
const CW = PAGE_W - M * 2;
const FOOT_Y = 796;

const CONTRACT_NO = '002/ZT-PMS/2026';
const CONTRACT_DATE = 'January 1, 2026';
const BUYER = 'PT. ZHONGTIAN NEW ENERGY INDONESIA, hereinafter PT. ZT';
const BUYER_ADDR = 'Jl. Trembesi Blok D Kompleks Bandar Kemayoran, Desa/Kelurahan Pademangan Timur, Kec. Pademangan, Kota Adm. Jakarta Utara';
const SELLER = 'PT. PARIT MUJUR SEJAHTERA, hereinafter PT. PMS';
const SELLER_ADDR = 'Jl. Dr. Susilo No. 88 RT. 009, RW. 004 Kelurahan Paal Satu Kecamatan Tanjung Pandan Kabupaten Belitung';

const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true, info: { Title: 'Silica Sand Sale & Purchase Contract', Producer: BUYER } });
const ws = fs.createWriteStream(OUT_FILE);
doc.pipe(ws);

function addPage() {
  doc.addPage();
  doc.font('Helvetica-Bold').fontSize(24).fillColor(RED).text('Z. T*', M, 30);
  doc.font('Helvetica').fontSize(11.5).fillColor(RED).text('PT. ZHONGTIAN NEW ENERGY INDONESIA', M + 82, 42);
  doc.moveTo(M, 70).lineTo(PAGE_W - M, 70).lineWidth(1).strokeColor(RED).stroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(GRAY)
    .text('Add: The Mansion Bougenville Tower Fontana lv27 Unit L2 JL. Trembesi Blok D Kompleks Bandar Kemayoran-Jakarta Utara 14410.', M, FOOT_Y, { width: CW, align: 'center' })
    .text('Email: wenjiangxin@vip.126.com', M, FOOT_Y + 11, { width: CW, align: 'center' });
  return 96;
}

let y = addPage();

// 标题
doc.font('Helvetica-Bold').fontSize(16).fillColor(INK).text('Silica Sand Sale & Purchase Contract', M, y, { width: CW, align: 'center' });
y = doc.y + 10;
doc.font('Helvetica').fontSize(10).fillColor(INK)
  .text(`Contract No.: ${CONTRACT_NO}`, M, y, { width: CW, align: 'right' })
  .text(`Date: ${CONTRACT_DATE}`, M, doc.y, { width: CW, align: 'right' });
y = doc.y + 16;

// 双方信息
function party(label, name, addr, yPos) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(label, M, yPos);
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(name, M + 70, yPos);
  doc.font('Helvetica').fontSize(9.5).fillColor(INK).text(`Address: ${addr}`, M + 70, doc.y + 2, { width: CW - 70 });
  return doc.y + 12;
}
y = party('Buyer:', BUYER, BUYER_ADDR, y);
y = party('Seller:', SELLER, SELLER_ADDR, y) + 4;

// 条款
function clause(num, text, yPos, width = CW) {
  const w = width - 30;
  const h = doc.font('Helvetica').fontSize(10).heightOfString(text, { width: w, lineGap: 3 });
  if (yPos + h + 14 > FOOT_Y - 24) yPos = addPage();
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${num}.`, M, yPos, { width: 26 });
  doc.font('Helvetica').fontSize(10).fillColor(INK).text(text, M + 26, yPos, { width: w, align: 'justify', lineGap: 3 });
  return doc.y + 11;
}

function section(num, title, body, yPos, justify = false) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${num}. ${title}`, M, yPos, { width: CW });
  yPos = doc.y + 4;
  doc.font('Helvetica').fontSize(10).fillColor(INK)
    .text(body ? `${body.toUpperCase()}` : '', M, yPos, { width: CW, align: justify ? 'justify' : 'left', lineGap: 3 });
  return doc.y + 11;
}

// 1. Commodity
y = section(1, 'COMMODITY', 'Silica Sand', y);

// 2. Quantity（含供货期限更新为 2026-2028）
const qty = `50,000 MT per Month (+/-10%), from January 2026 to December 2028. A total of 1.8 million MT.`;
y = clause(2, qty, y);
y = doc.y + 10;

// 3. Port of loading
y = clause(3, 'Tanjung Batu Anchorage, Belitung, Indonesia', y);

// 4. Quality 规格表（居中两列表格，固定行高，避免文字重叠）
if (y + 120 > FOOT_Y - 24) y = addPage();
doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text('4. QUALITY:', M, y, { width: CW });
y = doc.y + 8;

const tW = 300;                    // 表格总宽
const tX = M + (CW - tW) / 2;      // 表格水平居中
const c1 = tW * 0.5;               // 列宽
const rowH = 18;

doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK)
  .text('CONTRACTUAL SPECIFICATION OF SILICA', tX, y, { width: tW, align: 'center' });
y = doc.y + 4;

function tableRow(a, b, yy, bold) {
  doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9.5).fillColor(INK)
    .text(a, tX, yy + 4, { width: c1, align: 'center', lineBreak: false })
    .text(b, tX + c1, yy + 4, { width: tW - c1, align: 'center', lineBreak: false });
  // 上横线 + 三根竖线
  doc.moveTo(tX, yy).lineTo(tX + tW, yy).lineWidth(0.5).strokeColor(GRAY).stroke();
  doc.moveTo(tX, yy).lineTo(tX, yy + rowH).stroke();
  doc.moveTo(tX + c1, yy).lineTo(tX + c1, yy + rowH).stroke();
  doc.moveTo(tX + tW, yy).lineTo(tX + tW, yy + rowH).stroke();
  return yy + rowH;
}

y = tableRow('PARAMETER', 'GUARANTEED', y, true);
y = tableRow('SiO2', '99.5% Min.', y, false);
y = tableRow('Fe2O3', '0.012% Max', y, false);
y = tableRow('H2O (Moisture)', '5.0% Max.', y, false);
doc.moveTo(tX, y).lineTo(tX + tW, y).lineWidth(0.5).strokeColor(GRAY).stroke(); // 表格底线
y += 14;

// 5. Price
y = section(5, 'PRICE', 'RMB 80/MT FOB barge port of Tanjung Batu Anchorage, Belitung, Indonesia', y);

// 6. Payment
y = clause(6, '100% of the payment will be paid at the POL after the cargo is loaded.', y);

// 7. Weight determination
const w7 = 'At the POL, PT. Anindya Wiraputra Konsult Indonesia shall take representative samples in accordance with normal international practice, and determine the weight of the shipment by the draft survey which will be used for final payment settlement.';
y = section(7, 'WEIGHT DETERMINATION AND SAMPLE ANALYSIS', w7, y, true);

// 8. Risk and ownership
const w8 = 'The risk with respect to the silica shipment shall pass on from Seller to Buyer when the Silica progressively crosses the ship\'s rails at the loading port. Title and ownership shall pass from Seller to Buyer when full payment has been received by the Seller.';
y = section(8, 'RISK AND OWNERSHIP', w8, y, true);

// 9. Technical support
const w9 = 'PT. ZT will provide corresponding technical support in terms of production, including arranging professional engineers to guide. Assist PT. PMS to develop the mining area reasonably and effectively.';
y = section(9, 'TECHNICAL SUPPORT', w9, y, true);

// 10. Miscellaneous（含有效期补充）
const w10 = 'This contract shall be governed by and construed in accordance with of the laws of Indonesia. Written in English and made into 2 originals. Each party holds one original after signing.';
y = clause(10, w10, y);

// 有效期（依据用户要求：2026年元月至2028年12月31日）
const effective = 'This contract shall be effective from January 1, 2026 and remain in force until December 31, 2028. Upon expiry, the contract shall terminate automatically unless renewed by written agreement of both parties.';
y = clause(11, effective, y);

// 签署区
y += 24;
if (y + 190 > FOOT_Y - 24) y = addPage();
const colW = (CW - 40) / 2;
const xB = M + colW + 40;
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(`Seller: ${SELLER}`, M, y, { width: colW });
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(INK).text(`Buyer: ${BUYER}`, xB, y, { width: colW });
y += 26;
doc.font('Helvetica').fontSize(10).fillColor(INK).text('Sign:', M, y).text('Sign:', xB, y);
y += 56;
doc.font('Helvetica').fontSize(10).fillColor(INK).text('Address:', M, y).text('Address:', xB, y);
y += 22;
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
  fileName: 'contracts/contract-pms-zt-silica-sale-purchase-2026-2028.pdf',
  contentType: 'application/pdf',
});
const url = await storage.generatePresignedUrl({ key, expireTime: 604800 });
console.log(JSON.stringify({ key, url }));