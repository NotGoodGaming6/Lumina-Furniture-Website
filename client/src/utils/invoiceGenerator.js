export const generateOrderInvoice = (order) => {
  if (!order) return;

  const orderId = order._id ? `#${order._id.slice(-8).toUpperCase()}` : '#LUMINA-INV';
  const orderDate = order.createdAt 
    ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const customerName = order.user?.name || order.shippingAddress?.fullName || 'Valued Customer';
  const customerEmail = order.user?.email || 'N/A';
  const address = order.shippingAddress || {};

  const itemsHtml = (order.orderItems || []).map((item) => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 16px 8px; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-weight: 600; color: #0f172a;">
        ${item.name}
      </td>
      <td style="padding: 16px 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; text-align: center; color: #475569;">
        ${item.qty || item.quantity || 1}
      </td>
      <td style="padding: 16px 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; text-align: right; color: #475569;">
        $${(item.price || 0).toFixed(2)}
      </td>
      <td style="padding: 16px 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; text-align: right; font-weight: 700; color: #0f172a;">
        $${((item.price || 0) * (item.qty || item.quantity || 1)).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const subtotal = order.totalPrice || 0;
  const shipping = subtotal > 150 ? 0 : 45;
  const grandTotal = subtotal + shipping;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>LUMINA Invoice - ${orderId}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #ffffff;
          color: #0f172a;
          margin: 0;
          padding: 40px;
          -webkit-print-color-adjust: exact;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 40px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }
        .logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0f172a;
        }
        .logo-dot {
          color: #d97706;
        }
        .badge {
          font-family: monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid #cbd5e1;
        }
        @media print {
          body { padding: 0; }
          .invoice-box { border: none; padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 24px; margin-bottom: 32px;">
          <div>
            <div class="logo">LUMINA<span class="logo-dot">.</span></div>
            <div style="font-size: 12px; font-family: monospace; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.1em;">
              Copenhagen & Stockholm Design Atelier
            </div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
              Store Kongensgade 42, 1264 Copenhagen, Denmark
            </div>
          </div>
          <div style="text-align: right;">
            <div className="badge" style="display: inline-block; margin-bottom: 8px;">OFFICIAL INVOICE</div>
            <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; font-weight: 700; color: #0f172a;">${orderId}</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Date: ${orderDate}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 32px; gap: 32px;">
          <div style="flex: 1; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b; margin-bottom: 8px;">BILLED TO</div>
            <div style="font-size: 16px; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; color: #0f172a;">${customerName}</div>
            <div style="font-size: 13px; color: #475569; margin-top: 4px;">${customerEmail}</div>
          </div>

          <div style="flex: 1; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b; margin-bottom: 8px;">SHIPPING RESIDENCE</div>
            <div style="font-size: 13px; color: #334155; line-height: 1.5;">
              ${address.address || 'Standard Address'}<br>
              ${address.city || ''} ${address.postalCode || ''}<br>
              ${address.country || 'International Residence'}
            </div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <thead>
            <tr style="border-bottom: 2px solid #e2e8f0; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #64748b;">
              <th style="text-align: left; padding: 12px 8px;">Object Description</th>
              <th style="text-align: center; padding: 12px 8px;">Qty</th>
              <th style="text-align: right; padding: 12px 8px;">Unit Price</th>
              <th style="text-align: right; padding: 12px 8px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <div style="width: 280px; background: #f8fafc; p-4; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748b; margin-bottom: 8px;">
              <span>Subtotal:</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
              <span>White-Glove Delivery:</span>
              <span>${shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 700; color: #0f172a;">
              <span>Total Paid:</span>
              <span>$${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #e2e8f0; pt-6; padding-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; font-family: monospace;">
          Thank you for choosing Lumina Scandinavian Studio. For support inquiries, contact studio@lumina.com.
        </div>
      </div>

      <div className="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()" style="background: #0f172a; color: #ffffff; border: none; padding: 12px 32px; font-family: monospace; font-size: 12px; text-transform: uppercase; font-weight: 700; border-radius: 8px; cursor: pointer;">
          Print / Save PDF Invoice
        </button>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  }
};
