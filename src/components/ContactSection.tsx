import emailjs from "@emailjs/browser";
import { useRef, useState } from 'react';
import { Container } from "react-bootstrap";
export default function ContactSection() {
  const form = useRef();
  const [success, setSuccess] = useState(null);
  // const [metaData, setMetaData] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12yqpdo",
        "template_qa4pqev",
        form.current,
        "LYwiuAFI1c6Btwysb"
      )
      .then(
        (result) => {
          setSuccess(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <Container className="contact-section mb-5">
    <form ref={form} onSubmit={sendEmail} id="contact-form">
                        <div id="contact-form">
                          <div className="row contact-row">
                            <p className="contact-title">
                              Contact Information
                            </p>
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
                              <input
                                type="email"
                                name="mail"
                                id="mail"
                                placeholder="Email"
                              />
                            </div>
                            {/* <div className="col-md-6">
                              <input type="email" name="cmail" id="cmail" placeholder="Confirm Email" />
                            </div> */}
                            <div className="col-md-6">
                              <label htmlFor="Phone">Phone</label>
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="contact">
                                How Should We Contact You?
                              </label>
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
                              <label htmlFor="about">
                                Please Contact Me About
                              </label>
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
                                <option value="British Columbia">
                                  British Columbia
                                </option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="New Brunswick">
                                  New Brunswick
                                </option>
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
                                <option value="Saskatchewan">
                                  Saskatchewan
                                </option>
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
                            value="Send Message"
                          />
                        </div>
                        {success && (
                          <div
                            className="alert alert-success mt-4"
                            role="alert"
                          >
                            Your message was sent Successfully
                          </div>
                        )}
                      </form>
    </Container>
  )
}
