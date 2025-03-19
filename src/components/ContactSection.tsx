import axios from "axios";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}
export default function ContactSection() {
  const form = useRef();
  const [success, setSuccess] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  async function sendEmail(e) {
    e.preventDefault();
    setBtnLoader(true);
    const formData: Record<string, string> = {};
    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      });

    const bodyData = JSON.stringify({
      fromEmail: "noreply@asimali.ca",
      toEmail: "clientcare@asimali.ca",
      emailSubject:
        formData.subject + "-" + formData.fname + " " + formData.lname,
      fname: formData.fname.toString() || "",
      lname: formData.lname.toString() || "",
      mail: formData.mail.toString() || "",
      phone: formData.phone.toString() || "",
      province: formData.province.toString() || "",
      contact: formData.contact.toString() || "",
      about: formData.about.toString() || "",
      message: formData.message.toString() || "",
    });
    const postBodyData = new FormData();

postBodyData.set('email_subject', formData.subject + "-" + formData.fname + " " + formData.lname);
postBodyData.set('name', formData.fname.toString() + " " + formData.lname.toString() || "");
postBodyData.set('email', formData.mail.toString() || "");
postBodyData.set('phone', formData.phone.toString() || "");
postBodyData.set('province', formData.province.toString() || "");
postBodyData.set('contact', formData.contact.toString() || "");
postBodyData.set('about', formData.about.toString() || "");
postBodyData.set('message', formData.message.toString() || "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: bodyData,
      });

      const post_config = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/api/v1/contact-form/`,
        data: postBodyData,
      };
      const post_response = await axios(post_config);
      const data = await response.json();
      setBtnLoader(false);
      setSuccess(data.message);
      console.log(data);
      e.target.reset();
    } catch (error) {}
  }
  return (
    <Container className="contact-section mb-5" id="apply_now">
      <form ref={form} onSubmit={sendEmail} id="contact-form">
        <div id="contact-form">
          <div className="row contact-row">
            <div className="col-md-6">
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
              />
            </div>
            <div className="col-md-12">
              <input type="email" name="mail" id="mail" placeholder="Email" />
            </div>
            <div className="col-md-6">
              <label htmlFor="Phone">Phone</label>
              <input type="tel" name="phone" id="phone" placeholder="Phone" />
            </div>
            <div className="col-md-6">
              <label htmlFor="contact">How Should We Contact You?</label>
              <select
                name="contact"
                id="contact"
                className="form_control"
                aria-required="true"
                aria-invalid="false"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="about">Please Contact Me About</label>
              <select
                name="about"
                id="about"
                className="form_control"
                aria-required="true"
                aria-invalid="false"
              >
                <option value="Mortgage">Mortgage</option>
                <option value="Leasing">Leasing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="province">Province</label>
              <select
                name="province"
                className="form_control"
                aria-invalid="false"
              >
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland &amp; Labrador">
                  Newfoundland &amp; Labrador
                </option>
                <option value="Northwest Territories">
                  Northwest Territories
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Nunavut">Nunavut</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Yukon">Yukon</option>
              </select>
            </div>
            <div className="col-md-12 mt-3">
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
              />
            </div>
            <div className="col-md-12">
              <textarea
                name="message"
                id="message"
                style={{ height: "120px" }}
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <input
            className="contactBtn mt-3"
            type="submit"
            value={btnLoader ? "Loading..." : "Send Message"}
          />
        </div>
        {success && (
          <div className="alert alert-success mt-4" role="alert">
            Your message was sent Successfully
          </div>
        )}
      </form>
    </Container>
  );
}
