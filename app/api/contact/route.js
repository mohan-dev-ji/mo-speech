export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 requests per 15 minutes

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const record = rateLimitMap.get(ip);
  
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Check for suspicious content (basic spam detection)
    const spamKeywords = ['viagra', 'casino', 'loan', 'click here', 'buy now', 'free money'];
    const messageLower = message.toLowerCase();
    if (spamKeywords.some(keyword => messageLower.includes(keyword))) {
      console.log('Spam detected in message');
      return NextResponse.json(
        { error: 'Message contains suspicious content.' },
        { status: 400 }
      );
    }

    console.log('Contact form submission received:', { name, email, message: message.substring(0, 50) + '...' });
    console.log('Environment variables check:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPassword: !!process.env.EMAIL_PASSWORD,
      emailUser: process.env.EMAIL_USER
    });

    // Try different Zoho SMTP configurations
    const smtpConfigs = [
      {
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        name: 'Zoho EU (SSL) - App Password'
      },
      {
        host: 'smtp.zoho.eu',
        port: 587,
        secure: false,
        name: 'Zoho EU (TLS) - App Password'
      },
      {
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        name: 'Zoho US (SSL) - App Password'
      },
      {
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        name: 'Zoho US (TLS) - App Password'
      }
    ];

    // Also try with regular password if app password fails
    const regularPasswordConfigs = [
      {
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        name: 'Zoho EU (SSL) - Regular Password'
      },
      {
        host: 'smtp.zoho.eu',
        port: 587,
        secure: false,
        name: 'Zoho EU (TLS) - Regular Password'
      }
    ];

    let transporter;
    let lastError;

    // Try app password configurations first
    for (const config of smtpConfigs) {
      try {
        console.log(`Trying ${config.name} configuration...`);
        
        transporter = nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // Test the connection
        await transporter.verify();
        console.log(`✅ Success with ${config.name} configuration`);
        break; // Exit the loop if successful
        
      } catch (error) {
        console.log(`❌ Failed with ${config.name}:`, error.message);
        lastError = error;
        continue; // Try next configuration
      }
    }

    // If app password failed, try with regular password (for testing only)
    if (!transporter && process.env.EMAIL_REGULAR_PASSWORD) {
      console.log('App password failed, trying with regular password...');
      for (const config of regularPasswordConfigs) {
        try {
          console.log(`Trying ${config.name} configuration...`);
          
          transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_REGULAR_PASSWORD,
            },
          });

          // Test the connection
          await transporter.verify();
          console.log(`✅ Success with ${config.name} configuration`);
          break; // Exit the loop if successful
          
        } catch (error) {
          console.log(`❌ Failed with ${config.name}:`, error.message);
          lastError = error;
          continue; // Try next configuration
        }
      }
    }

    if (!transporter) {
      console.error('All SMTP configurations failed. Last error:', lastError);
      return NextResponse.json(
        { error: 'All SMTP configurations failed. Please check your credentials and try again.' },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@mospeech.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
IP: ${ip}
Time: ${new Date().toISOString()}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
<p><strong>IP:</strong> ${ip}</p>
<p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    return NextResponse.json(
      { error: 'Failed to send message: ' + error.message },
      { status: 500 }
    );
  }
} 