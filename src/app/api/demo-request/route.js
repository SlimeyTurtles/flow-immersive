import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, company, useCase, otherUseCase, details } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !company || !useCase) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets and email
    const timestamp = new Date().toISOString();
    const submissionData = {
      timestamp,
      email,
      firstName,
      lastName,
      company,
      useCase: useCase === 'Other (please specify)' ? otherUseCase : useCase,
      details: details || 'No additional details provided.'
    };

    // Create email content
    const emailContent = `
New Demo Request from Flow Immersive Website

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Company: ${company}

Use Case: ${submissionData.useCase}

Additional Details:
${submissionData.details}

Timestamp: ${timestamp}

---
Sent from Flow Immersive Demo Request Form
    `.trim();

    console.log('Demo request received:', {
      ...submissionData,
      recipient: 'info@flow.gl'
    });

    // TODO: Implement Google Sheets integration
    // You'll need to add googleapis package: npm install googleapis
    // And set up service account credentials
    /*
    const { google } = require('googleapis');
    const sheets = google.sheets('v4');
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path-to-service-account-key.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[
          submissionData.timestamp,
          submissionData.firstName,
          submissionData.lastName,
          submissionData.email,
          submissionData.company,
          submissionData.useCase,
          submissionData.details
        ]],
      },
    });
    */

    // TODO: Implement email sending to info@flow.gl
    // You'll need to add nodemailer or similar: npm install nodemailer
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      // Configure your email service
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'info@flow.gl',
      subject: `Demo Request from ${firstName} ${lastName} - ${company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo request submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}