import { render } from 'svelte-email';
import Mailer from '$lib/components/Mailer.svelte';
import nodemailer from 'nodemailer';
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  try {
    // Retrieve the data from the URL query parameter
    const data = url.searchParams.get('data');

    if (!data) {
      return json({ success: false, error: 'Missing data parameter' });
    }

    // Parse the data as JSON
    const jsonData = JSON.parse(data);

    // Send the email and handle the response
    const result = await sendMailAsync(jsonData);

    // Return a success response with the email info
    return json({ success: true, info: result });
  } catch (error:any) {
    // Return an error response
    return json({ success: false, error: error.message || 'An error occurred' });
  }
}

async function sendMailAsync(data:any) {
  // Create the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 25,
    secure: false,
    auth: {
      user: data?.sender,
      pass: data?.password
    }
  });

  // Render the email template
  const emailHtml = render({
    template: Mailer,
    props: {
      authorName: data?.more?.school_name,
      authorImage: data?.more?.school_logo,
      baseUrl: data?.more?.school_url,
      code: data?.more?.code,
      reviewText: data?.more?.school_description,
      identification: data?.identification
    }
  });

  // Set the email options
  const options = {
    from: data?.sender,
    to: data?.receiver,
    subject: data?.subject,
    html: emailHtml
  };

  // Send the email and return a Promise
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}



/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    return json({ success: "ok" });
}

