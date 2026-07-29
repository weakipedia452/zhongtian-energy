import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    console.log('收到表单提交:', { type, ...data });

    // 验证必填字段
    if (type === 'contact') {
      if (!data.name || !data.email || !data.message) {
        return NextResponse.json(
          { success: false, error: '请填写所有必填字段' },
          { status: 400 }
        );
      }
    } else if (type === 'resume') {
      if (!data.name || !data.email || !data.position) {
        return NextResponse.json(
          { success: false, error: '请填写所有必填字段' },
          { status: 400 }
        );
      }
    }

    // 在实际部署时，这里应该调用邮件服务 API
    // 例如：SendGrid, Nodemailer, 或腾讯云邮件推送
    
    // 临时方案：返回成功，实际邮件需要通过后端服务发送
    console.log('表单提交成功:', { type, ...data });

    return NextResponse.json({
      success: true,
      message: '提交成功，我们会尽快与您联系',
    });
  } catch (error) {
    console.error('表单提交错误:', error);
    return NextResponse.json(
      { success: false, error: '提交失败，请稍后重试' },
      { status: 500 }
    );
  }
}
