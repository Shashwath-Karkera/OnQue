import nodemailer, { type Transporter } from "nodemailer";

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_HOST.trim().length > 0
  );
}

let transporterInstance: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!isSmtpConfigured()) return null;

  if (!transporterInstance) {
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const secure =
      process.env.SMTP_SECURE === "true" || port === 465;

    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return transporterInstance;
}

/**
 * Generate a neat, minimalist HTML email template for OTP verification
 */
function generateOtpHtmlEmail(otp: string, recipientName: string = "User"): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ONcue Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f0f3f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0d0f; padding: 40px 12px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table role="presentation" width="100%" style="max-width: 460px; background-color: #111417; border: 1px solid #22262b; border-radius: 16px; overflow: hidden;" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px; text-align: center; border-bottom: 1px solid #1c2127;">
              <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                ON<span style="color: #3b82f6;">cue</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 32px 24px; text-align: center;">
              <h1 style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #ffffff;">
                Verification Code
              </h1>
              <p style="margin: 0 0 24px; font-size: 13px; line-height: 1.5; color: #8b949e;">
                Hello <strong>${recipientName}</strong>, enter this 6-digit code to complete your verification:
              </p>

              <!-- OTP Digits Box -->
              <div style="background-color: #0d0f12; border: 1px solid #22262b; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <span style="font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #f59e0b; display: inline-block; padding-left: 8px;">
                  ${otp}
                </span>
                <div style="margin-top: 8px; font-size: 12px; color: #ef4444; font-weight: 500;">
                  Expires in 1 minute
                </div>
              </div>

              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #6e7681;">
                If you did not request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #0b0d0f; border-top: 1px solid #1c2127; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #555e6c;">
                &copy; ${new Date().getFullYear()} ONcue. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Sends the 6-digit OTP code to the recipient email via SMTP.
 */
export async function sendOtpEmail(
  toEmail: string,
  otp: string,
  recipientName: string = "Valued Member"
): Promise<{ success: boolean; messageId?: string; devMode?: boolean }> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log("\n" + "=".repeat(50));
    console.log(`[ONcue OTP] Recipient: ${toEmail}`);
    console.log(`[ONcue OTP] Code: ${otp} (Expires in 1 min)`);
    console.log("=".repeat(50) + "\n");
    return { success: true, devMode: true };
  }

  const fromAddress =
    process.env.SMTP_FROM || `"ONcue Security" <${process.env.SMTP_USER}>`;

  const mailOptions = {
    from: fromAddress,
    to: toEmail,
    subject: `${otp} is your ONcue verification code`,
    text: `Your ONcue verification code is: ${otp}. It will expire in 1 minute.`,
    html: generateOtpHtmlEmail(otp, recipientName),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[ONcue Mailer] Verification email sent to ${toEmail}. Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      devMode: false,
    };
  } catch (error: any) {
    console.error(`[ONcue Mailer Error] Failed to send email to ${toEmail}:`, error);
    // Even if SMTP fails, print the code so developers aren't locked out in dev
    console.log(`[ONcue Mailer Emergency Fallback Code for ${toEmail}]: ${otp}`);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}
