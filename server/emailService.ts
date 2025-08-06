import nodemailer from 'nodemailer';
import type { QuoteRequest } from '@shared/schema';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendQuoteRequestNotification(quoteRequest: QuoteRequest): Promise<void> {
    const servicesText = Array.isArray(quoteRequest.services) 
      ? quoteRequest.services.join(', ')
      : 'No services specified';

    const emailContent = `
New Quote Request Received!

Customer Information:
- Name: ${quoteRequest.firstName} ${quoteRequest.lastName}
- Phone: ${quoteRequest.phone}
- Email: ${quoteRequest.email}

Service Location:
- Address: ${quoteRequest.address}
- City: ${quoteRequest.city}
- State: ${quoteRequest.state || 'TX'}
- ZIP: ${quoteRequest.zip}

Services Requested:
${servicesText}

Project Description:
${quoteRequest.description || 'No description provided'}

Request Details:
- Request ID: ${quoteRequest.id}
- Status: ${quoteRequest.status}
- Submitted: ${quoteRequest.createdAt ? new Date(quoteRequest.createdAt).toLocaleString('en-US', {
  timeZone: 'America/Chicago',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}) : 'Unknown time'}

Please contact the customer within 24 hours to provide a quote.

---
Welcome Home Landscaping & Power Washing
Phone: (972) 409-6288
Email: welcomehomelandscapingllc@gmail.com
    `.trim();

    const mailOptions = {
      from: `"Welcome Home Landscaping" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Quote Request - ${quoteRequest.firstName} ${quoteRequest.lastName} (${servicesText})`,
      text: emailContent,
      html: this.formatAsHTML(emailContent, quoteRequest),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Quote notification email sent:', info.messageId);
    } catch (error) {
      console.error('Failed to send quote notification email:', error);
      throw error;
    }
  }

  private formatAsHTML(content: string, quoteRequest: QuoteRequest): string {
    const servicesText = Array.isArray(quoteRequest.services) 
      ? quoteRequest.services.join(', ')
      : 'No services specified';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quote Request</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2D5016; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .section { margin-bottom: 25px; }
    .section h3 { color: #2D5016; margin-bottom: 10px; border-bottom: 2px solid #2D5016; padding-bottom: 5px; }
    .info-row { margin: 8px 0; }
    .label { font-weight: bold; color: #2D5016; }
    .services { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2D5016; }
    .description { background: white; padding: 15px; border-radius: 5px; font-style: italic; }
    .footer { background: #2D5016; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
    .urgent { background: #dc2626; color: white; padding: 10px; border-radius: 5px; text-align: center; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏡 New Quote Request</h1>
    <p>Welcome Home Landscaping & Power Washing</p>
  </div>
  
  <div class="content">
    <div class="urgent">
      <strong>Action Required:</strong> Please contact customer within 24 hours
    </div>

    <div class="section">
      <h3>👤 Customer Information</h3>
      <div class="info-row"><span class="label">Name:</span> ${quoteRequest.firstName} ${quoteRequest.lastName}</div>
      <div class="info-row"><span class="label">Phone:</span> <a href="tel:${quoteRequest.phone}">${quoteRequest.phone}</a></div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:${quoteRequest.email}">${quoteRequest.email}</a></div>
    </div>

    <div class="section">
      <h3>📍 Service Location</h3>
      <div class="info-row"><span class="label">Address:</span> ${quoteRequest.address}</div>
      <div class="info-row"><span class="label">City:</span> ${quoteRequest.city}</div>
      <div class="info-row"><span class="label">State:</span> ${quoteRequest.state || 'TX'}</div>
      <div class="info-row"><span class="label">ZIP:</span> ${quoteRequest.zip}</div>
    </div>

    <div class="section">
      <h3>🛠️ Services Requested</h3>
      <div class="services">${servicesText}</div>
    </div>

    ${quoteRequest.description ? `
    <div class="section">
      <h3>📝 Project Description</h3>
      <div class="description">${quoteRequest.description}</div>
    </div>
    ` : ''}

    <div class="section">
      <h3>📊 Request Details</h3>
      <div class="info-row"><span class="label">Request ID:</span> ${quoteRequest.id}</div>
      <div class="info-row"><span class="label">Status:</span> ${quoteRequest.status}</div>
      <div class="info-row"><span class="label">Submitted:</span> ${quoteRequest.createdAt ? new Date(quoteRequest.createdAt).toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }) : 'Unknown time'}</div>
    </div>
  </div>

  <div class="footer">
    <p><strong>Welcome Home Landscaping & Power Washing</strong></p>
    <p>Phone: (972) 409-6288 | Email: welcomehomelandscapingllc@gmail.com</p>
  </div>
</body>
</html>
    `;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();