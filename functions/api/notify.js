export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { phone, province, city, town, floorCount, roomSummary } = body;

    // 格式化手机号（脱敏）
    const maskedPhone = phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '未填写';

    // 构建消息内容
    let content = `🏠 新户型设计提交\n`;
    content += `📱 手机号：${maskedPhone}\n`;
    content += `📍 地区：${province || ''}${city || ''} ${town || ''}\n`;
    content += `🏢 楼层数：${floorCount || 1}层\n`;
    if (roomSummary && roomSummary.length > 0) {
      content += `📐 房间概览：\n`;
      roomSummary.forEach((floor, i) => {
        content += `  第${i + 1}层：${floor}\n`;
      });
    }
    content += `\n⏰ 提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`;

    // 发送到企业微信 webhook
    const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=06df3185-9f9b-450a-89c2-d02f81f5a4d1';
    const webhookBody = {
      msgtype: 'text',
      text: { content }
    };

    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookBody)
    });
    const result = await resp.json();

    return new Response(JSON.stringify({ ok: true, result }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
