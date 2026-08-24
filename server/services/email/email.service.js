const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  initTransporter() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      console.log('📧 Nodemailer transporter initialized with SMTP credentials');
    } else {
      console.log('📧 Nodemailer running in Logger Dev Mode (Set SMTP_HOST in .env to send live emails)');
    }
  }

  async sendOrderConfirmationEmail(toEmail, order) {
    if (!toEmail || !order) return;

    const orderId = order._id ? `#${order._id.toString().slice(-8).toUpperCase()}` : '#LUMINA';
    const totalAmount = (order.totalPrice || 0).toFixed(2);

    const itemsListHtml = (order.orderItems || []).map(item => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 0; font-family: Georgia, serif; font-size: 15px; color: #0f172a;">${item.name}</td>
        <td style="padding: 12px 0; text-align: center; color: #64748b; font-size: 13px;">${item.qty || 1}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #0f172a; font-size: 14px;">$${((item.price || 0) * (item.qty || 1)).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="font-family: system-ui, sans-serif; background-color: #fcfbf9; padding: 40px 20px; color: #0f172a;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 20px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-family: Georgia, serif; font-size: 32px; margin: 0; color: #0f172a;">LUMINA<span style="color: #d97706;">.</span></h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-top: 5px;">Scandinavian Design Atelier</p>
          </div>

          <h2 style="font-family: Georgia, serif; font-size: 22px; margin-bottom: 10px; color: #0f172a;">Order Confirmation ${orderId}</h2>
          <p style="color: #475569; line-height: 1.6; font-size: 14px;">Thank you for your acquisition. We are preparing your order for white-glove packaging and delivery.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
            <thead>
              <tr style="border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: left;">
                <th style="padding-bottom: 10px;">Object</th>
                <th style="padding-bottom: 10px; text-align: center;">Qty</th>
                <th style="padding-bottom: 10px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsListHtml}
            </tbody>
          </table>

          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #f1f5f9;">
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #0f172a;">
              <span>Total Paid:</span>
              <span>$${totalAmount}</span>
            </div>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            Lumina Atelier • Store Kongensgade 42, Copenhagen<br>
            If you have questions regarding your delivery, reply directly to this email.
          </div>
        </div>
      </div>
    `;

    try {
      if (this.transporter) {
        await this.transporter.sendMail({
          from: `"Lumina Studio" <${process.env.SMTP_FROM || 'studio@lumina.com'}>`,
          to: toEmail,
          subject: `Lumina Order Receipt ${orderId}`,
          html: htmlContent
        });
        console.log(`✅ Order confirmation email sent to ${toEmail}`);
      } else {
        console.log(`[DEV EMAIL LOG] Order confirmation for ${orderId} sent to ${toEmail} (Total: $${totalAmount})`);
      }
    } catch (err) {
      console.error('Failed to send order confirmation email:', err.message);
    }
  }

  async sendStatusUpdateEmail(toEmail, order, newStatus) {
    if (!toEmail || !order) return;

    const orderId = order._id ? `#${order._id.toString().slice(-8).toUpperCase()}` : '#LUMINA';
    const statusUpper = newStatus.toUpperCase();

    const htmlContent = `
      <div style="font-family: system-ui, sans-serif; background-color: #fcfbf9; padding: 40px 20px; color: #0f172a;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 20px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-family: Georgia, serif; font-size: 32px; margin: 0; color: #0f172a;">LUMINA<span style="color: #d97706;">.</span></h1>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-top: 5px;">Fulfillment Update</p>
          </div>

          <h2 style="font-family: Georgia, serif; font-size: 22px; margin-bottom: 10px; color: #0f172a;">Order Status Update</h2>
          <p style="color: #475569; line-height: 1.6; font-size: 14px;">
            Your order <strong>${orderId}</strong> status has been updated to:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background: #0f172a; color: #ffffff; font-family: monospace; font-size: 14px; font-weight: bold; padding: 10px 24px; border-radius: 9999px; letter-spacing: 2px;">
              ${statusUpper}
            </span>
          </div>

          <p style="color: #475569; font-size: 13px; text-align: center;">You can track your order status live in your account dashboard at Lumina.</p>

          <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            Lumina Atelier • Store Kongensgade 42, Copenhagen
          </div>
        </div>
      </div>
    `;

    try {
      if (this.transporter) {
        await this.transporter.sendMail({
          from: `"Lumina Studio" <${process.env.SMTP_FROM || 'studio@lumina.com'}>`,
          to: toEmail,
          subject: `Lumina Order Status Update ${orderId} [${statusUpper}]`,
          html: htmlContent
        });
        console.log(`✅ Order status update email sent to ${toEmail}`);
      } else {
        console.log(`[DEV EMAIL LOG] Status update for ${orderId} -> ${statusUpper} sent to ${toEmail}`);
      }
    } catch (err) {
      console.error('Failed to send status update email:', err.message);
    }
  }
}

module.exports = new EmailService();
