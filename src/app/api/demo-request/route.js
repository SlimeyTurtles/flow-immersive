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

    // Create email content
    const emailContent = `
New Demo Request from Flow Immersive Website

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Company: ${company}

Use Case: ${useCase}
${useCase === 'Other (please specify)' && otherUseCase ? `Other Use Case: ${otherUseCase}` : ''}

Additional Details:
${details || 'No additional details provided.'}

---
Sent from Flow Immersive Demo Request Form
    `.trim();

    // For now, we'll log the request
    // In production, you would integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - Resend
    console.log('Demo request received:', {
      email,
      firstName,
      lastName,
      company,
      useCase,
      otherUseCase,
      details,
      emailContent,
      timestamp: new Date().toISOString(),
      recipient: 'avinhahuynh@gmail.com'
    });

    // TODO: Implement actual email sending
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'avinhahuynh@gmail.com',
      subject: `Demo Request from ${firstName} ${lastName} - ${company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
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