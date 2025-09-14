import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, experience, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f7f4; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2e3b29; font-size: 28px; margin-bottom: 10px;">New Contact Form Submission</h1>
          <p style="color: #6f7c5c; font-size: 16px;">Lasmari Vineyard Website</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2e3b29; margin-bottom: 20px; font-size: 22px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #2e3b29;">Name:</strong> 
            <span style="color: #4a5568;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #2e3b29;">Email:</strong> 
            <a href="mailto:${email}" style="color: #f472b6; text-decoration: none;">${email}</a>
          </div>
          
          ${phone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #2e3b29;">Phone:</strong> 
            <span style="color: #4a5568;">${phone}</span>
          </div>
          ` : ''}
          
          ${experience ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #2e3b29;">Preferred Experience:</strong> 
            <span style="color: #4a5568;">${experience}</span>
          </div>
          ` : ''}
          
          <div style="margin-top: 25px;">
            <strong style="color: #2e3b29;">Message:</strong>
            <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #f472b6;">
              <p style="color: #4a5568; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #6f7c5c; font-size: 14px;">
            This message was sent from the Lasmari Vineyard contact form<br>
            <strong>Reply directly to respond to the visitor</strong>
          </p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission - Lasmari Vineyard

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${experience ? `Preferred Experience: ${experience}` : ''}

Message:
${message}

---
This message was sent from the Lasmari Vineyard contact form.
Reply directly to respond to the visitor.
    `;

    // Send email
    await transporter.sendMail({
      from: `"Lasmari Vineyard Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'info@lasmari.gr',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
