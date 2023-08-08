import emailjs from "@emailjs/browser";
import { useRef, useState } from 'react';
import { Container } from "react-bootstrap";


export default function ApplySection() {
  const form = useRef();
  const [success, setSuccess] = useState(null);
  // const [metaData, setMetaData] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    // emailjs
    //   .sendForm(
    //     "service_12yqpdo",
    //     "template_qa4pqev",
    //     form.current,
    //     "LYwiuAFI1c6Btwysb"
    //   )
    //   .then(
    //     (result) => {
    //       setSuccess(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    e.target.reset();
  };
  return (
    <Container className="contact-section mb-5" id="apply_now">
    <form ref={form} onSubmit={sendEmail} id="contact-form">
                        <div id="contact-form">
                          <div className="row contact-row mt-5">
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
                            <div className="col-md-6">
                              <input
                                type="email"
                                name="mail"
                                id="mail"
                                placeholder="Email Address"
                              />
                            </div>
                            {/* <div className="col-md-6">
                              <input type="email" name="cmail" id="cmail" placeholder="Confirm Email" />
                            </div> */}
                            <div className="col-md-6">
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Phone Number"
                              />
                            </div>
                            <div className="col-md-6">
                              <select
                                name="referred"
                                id="referred"
                                className="form_control"
                                aria-required="true"
                                aria-invalid="false"
                              >
                                <option value={null}>Referred</option>
                                <option value="Television Add">Television Add</option>
                                <option value="Radio Add">Radio Add</option>
                                <option value="Internet Search">Internet Search</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Brochure">Brochure</option>
                                <option value="Friend or Relative">Friend or Relative</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <select
                                name="homeowner"
                                id="homeowner"
                                className="form_control"
                                aria-required="true"
                                aria-invalid="false"
                              >
                                <option value={null}>Homeowner</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            <div className="col-md-6 mt-3">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <select
                                name="province"
                                className="form_control"
                                aria-invalid="false"
                              >
                                <option value={null}>Province/Territory</option>
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
                            <div className="col-md-4">
                              <select
                                name="mortgage"
                                id="mortgage"
                                className="form_control"
                                aria-required="true"
                                aria-invalid="false"
                              >
                                <option value={null}>Do You Have A Mortgage?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <input
                                type="text"
                                name="property"
                                id="property"
                                placeholder="Property Value ($)"
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                type="text"
                                name="balance"
                                id="balance"
                                placeholder="Current Mortgage Balance ($)"
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                name="loan"
                                id="loan"
                                placeholder="Requested Loan Amount ($)"
                              />
                            </div>
                            <div className="col-md-6">
                              <select
                                name="preferred"
                                id="preferred"
                                className="form_control"
                                aria-required="true"
                                aria-invalid="false"
                              >
                                <option value={null}>My Preferred Contact Method is...</option>
                                <option value="Phone">Phone</option>
                                <option value="Email">Email</option>
                                <option value="Phone & Email both are fine">Phone & Email both are fine</option>
                              </select>
                            </div>

                            <div className="col-md-12">
                              <textarea
                                name="message"
                                id="message"
                                style={{ height: "120px" }}
                                placeholder="Reason for Loan"
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
