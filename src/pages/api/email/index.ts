import { render } from "@react-email/render";
import { sendEmail } from "lib/email-helper";
import { NextResponse } from "next/server";
import ApplyNowEmail from "emails_template/apply_now";

import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST'){

    try {
      const data = await JSON.parse(req.body);
      const { fromEmail, toEmail, emailSubject, fname, lname, mail, phone, referred, homeowner, city, province, mortgage, property, balance, preferred, message, amount } = data;
      console.log(toEmail);
      await sendEmail({
        from: fromEmail,
        to: toEmail,
        subject: emailSubject,
        html: render(ApplyNowEmail({
          fname, lname, mail, phone, referred, homeowner, city, province, mortgage, property, balance, preferred, message , amount
        }))
      });
      return res.send({ status: 200, message: 'Form Submission Success' });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}

