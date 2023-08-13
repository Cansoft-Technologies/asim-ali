import { render } from "@react-email/render";
import ContactUsEmail from "emails_template/contact_form";
import { sendEmail } from "lib/email-helper";

import AutoReply from "emails_template/auto_reply";
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST'){

    try {
      const data = await JSON.parse(req.body);
      const { fromEmail, toEmail, emailSubject, fname, lname, mail, phone, contact, about,province,message } = data;
      console.log(toEmail);
      await sendEmail({
        from: fromEmail,
        to: toEmail,
        subject: emailSubject,
        html: render(ContactUsEmail({
          fname, lname, mail, phone, contact, about, province,message
        }))
      });
      await sendEmail({
        from: fromEmail,
        to: mail,
        subject: "Thank you so much for contacting us on our website "+ fname,
        html: render(AutoReply({
          fname, lname
        }))
      });
      return res.send({ status: 200, message: 'Form Submission Success' });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}

