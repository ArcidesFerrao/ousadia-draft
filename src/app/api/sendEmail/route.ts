import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { TransportOptions } from 'nodemailer'


export async function POST(req: NextRequest ) {
  const {name, apelido, email, assunto, mensagem} = await req.json();


    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                use: process.env.SMTP_SERVER_USERNAME,
                pass: process.env.SMTP_SERVER_PASSWORD,
            }
        } as TransportOptions );

        const mailOptions ={
            from: email,
            to: 'cidesferrao@gmail.com',
            subject: assunto || 'No subject',
            text: `Name: ${name} ${apelido}\nEmail: ${email}\n\nMessage:\n${mensagem}`
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({message: 'Message sent successfully'}, {status: 200})
        
    } catch (error ) {
        console.error('Error sending email: ', error);
        return NextResponse.json({message: 'Failed to send Message'}, {status: 500})
    }
}