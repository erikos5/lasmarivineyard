import nodemailer from 'nodemailer';
import { Booking } from '@/lib/types';

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

function customerEmailHtml(booking: Booking): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #faf7f2; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #482420; padding: 40px 30px; text-align: center;">
        <h1 style="color: #faf7f2; font-size: 28px; margin: 0 0 8px;">Booking Confirmed</h1>
        <p style="color: #d4a574; font-size: 16px; margin: 0;">Lasmari Vineyard, Corfu</p>
      </div>

      <div style="padding: 30px;">
        <p style="color: #482420; font-size: 16px; line-height: 1.6;">
          Dear ${booking.customerName},
        </p>
        <p style="color: #5a4a42; font-size: 16px; line-height: 1.6;">
          Thank you for your booking! We're excited to welcome you to Lasmari Vineyard. Here are your booking details:
        </p>

        <div style="background-color: white; border-radius: 10px; padding: 25px; margin: 25px 0; border: 1px solid #e8e0d8;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8a7a72; font-size: 14px; vertical-align: top;">Experience</td>
              <td style="padding: 10px 0; color: #482420; font-size: 14px; font-weight: bold; text-align: right;">${booking.experienceName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a72; font-size: 14px; border-top: 1px solid #f0ebe5;">Date</td>
              <td style="padding: 10px 0; color: #482420; font-size: 14px; font-weight: bold; text-align: right; border-top: 1px solid #f0ebe5;">${formatDate(booking.date)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a72; font-size: 14px; border-top: 1px solid #f0ebe5;">Time</td>
              <td style="padding: 10px 0; color: #482420; font-size: 14px; font-weight: bold; text-align: right; border-top: 1px solid #f0ebe5;">${booking.timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a72; font-size: 14px; border-top: 1px solid #f0ebe5;">Guests</td>
              <td style="padding: 10px 0; color: #482420; font-size: 14px; font-weight: bold; text-align: right; border-top: 1px solid #f0ebe5;">${booking.guests}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a7a72; font-size: 14px; border-top: 1px solid #f0ebe5;">Total Paid</td>
              <td style="padding: 10px 0; color: #482420; font-size: 16px; font-weight: bold; text-align: right; border-top: 1px solid #f0ebe5;">${formatPrice(booking.totalPrice)}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f0ebe5; border-radius: 10px; padding: 20px; margin: 25px 0;">
          <h3 style="color: #482420; font-size: 16px; margin: 0 0 12px;">What to Expect</h3>
          <ul style="color: #5a4a42; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Comfortable walking shoes are recommended for vineyard tours</li>
            <li>Free parking is available on-site</li>
          </ul>
        </div>

        ${booking.specialRequests ? `
        <div style="background-color: #fff; border-left: 4px solid #d4a574; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="color: #8a7a72; font-size: 12px; margin: 0 0 5px; text-transform: uppercase; letter-spacing: 1px;">Your Special Requests</p>
          <p style="color: #482420; font-size: 14px; margin: 0; line-height: 1.5;">${booking.specialRequests}</p>
        </div>
        ` : ''}

        <p style="color: #5a4a42; font-size: 14px; line-height: 1.6; margin-top: 25px;">
          Need to make changes? Contact us at <a href="mailto:info@lasmari.gr" style="color: #d4a574;">info@lasmari.gr</a> or call <a href="tel:+302661012345" style="color: #d4a574;">+30 26610 12345</a>.
        </p>

        <p style="color: #5a4a42; font-size: 16px; line-height: 1.6; margin-top: 20px;">
          We look forward to seeing you!<br>
          <strong style="color: #482420;">The Lasmari Vineyard Team</strong>
        </p>
      </div>

      <div style="background-color: #482420; padding: 20px 30px; text-align: center;">
        <p style="color: #d4a574; font-size: 12px; margin: 0;">
          Lasmari Vineyard &middot; Corfu, Greece<br>
          <a href="https://lasmari.wine" style="color: #faf7f2; text-decoration: none;">lasmari.wine</a>
        </p>
      </div>
    </div>
  `;
}

function ownerEmailHtml(booking: Booking): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f7f4; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px; padding: 20px; background-color: #482420; border-radius: 10px;">
        <h1 style="color: #faf7f2; font-size: 24px; margin: 0;">New Booking Confirmed</h1>
      </div>

      <div style="background-color: white; padding: 25px; border-radius: 8px; border: 1px solid #e8e0d8;">
        <h2 style="color: #482420; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">Booking Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px; width: 140px;">Booking ID</td>
            <td style="padding: 8px 0; color: #482420; font-size: 14px; font-weight: bold;">${booking.id.slice(0, 8)}...</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Experience</td>
            <td style="padding: 8px 0; color: #482420; font-size: 14px; font-weight: bold;">${booking.experienceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Date & Time</td>
            <td style="padding: 8px 0; color: #482420; font-size: 14px; font-weight: bold;">${formatDate(booking.date)} at ${booking.timeSlot}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Guests</td>
            <td style="padding: 8px 0; color: #482420; font-size: 14px; font-weight: bold;">${booking.guests}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Amount Paid</td>
            <td style="padding: 8px 0; color: #482420; font-size: 16px; font-weight: bold;">${formatPrice(booking.totalPrice)}</td>
          </tr>
        </table>

        <h2 style="color: #482420; font-size: 18px; margin: 25px 0 15px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">Customer Info</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #482420; font-size: 14px; font-weight: bold;">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Email</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${booking.customerEmail}" style="color: #d4a574;">${booking.customerEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8a7a72; font-size: 14px;">Phone</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${booking.customerPhone}" style="color: #d4a574;">${booking.customerPhone || 'Not provided'}</a></td>
          </tr>
        </table>

        ${booking.specialRequests ? `
        <div style="background-color: #fff8f0; border-left: 4px solid #d4a574; padding: 12px 16px; margin-top: 20px; border-radius: 0 8px 8px 0;">
          <p style="color: #8a7a72; font-size: 12px; margin: 0 0 5px; text-transform: uppercase;">Special Requests</p>
          <p style="color: #482420; font-size: 14px; margin: 0;">${booking.specialRequests}</p>
        </div>
        ` : ''}
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lasmari.wine'}/admin" style="display: inline-block; background-color: #482420; color: #faf7f2; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">View in Dashboard</a>
      </div>
    </div>
  `;
}

export async function sendBookingConfirmationEmails(booking: Booking): Promise<void> {
  const transporter = createTransporter();

  const ownerEmail = process.env.EMAIL_TO || 'info@lasmari.gr';

  // Send both emails in parallel
  await Promise.all([
    // Email to customer
    transporter.sendMail({
      from: `"Lasmari Vineyard" <${process.env.EMAIL_USER}>`,
      to: booking.customerEmail,
      subject: `Booking Confirmed - ${booking.experienceName} on ${formatDate(booking.date)}`,
      html: customerEmailHtml(booking),
    }),

    // Email to owner
    transporter.sendMail({
      from: `"Lasmari Vineyard Bookings" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      replyTo: booking.customerEmail,
      subject: `New Booking: ${booking.experienceName} - ${booking.customerName} (${formatDate(booking.date)})`,
      html: ownerEmailHtml(booking),
    }),
  ]);
}
