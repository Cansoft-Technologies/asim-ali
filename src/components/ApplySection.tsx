import axios from "axios";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
function isInputNamedElement(
  e: Element
): e is HTMLInputElement & { name: string } {
  return "value" in e && "name" in e;
}

export default function ApplySection() {
  const form = useRef();
  const [success, setSuccess] = useState("");
  // const [metaData, setMetaData] = useState([]);
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
        "New Form Submission from :" + formData.fname + " " + formData.lname,
      fname: formData.fname.toString() || "",
      lname: formData.lname.toString() || "",
      mail: formData.mail.toString() || "",
      phone: formData.phone.toString() || "",
      referred: formData.referred.toString() || "",
      homeowner: formData.homeowner.toString() || "",
      city: formData.city.toString() || "",
      province: formData.province.toString() || "",
      mortgage: formData.mortgage.toString() || "",
      property: formData.property.toString() || "",
      balance: formData.balance.toString() || "",
      preferred: formData.preferred.toString() || "",
      amount: formData.loan.toString() || "",
      message: formData.message.toString() || "",
      usingFor: "apply-now",
    });
    const postBodyData = new FormData();

postBodyData.set('name', formData.fname.toString() + " " + formData.lname.toString() || "");
postBodyData.set('email', formData.mail.toString() || "");
postBodyData.set('phone', formData.phone.toString() || "");
postBodyData.set('referred', formData.referred.toString() || "");
postBodyData.set('homeowner', formData.homeowner.toString() || "");
postBodyData.set('city', formData.city.toString() || "");
postBodyData.set('province', formData.province.toString() || "");
postBodyData.set('mortgage', formData.mortgage.toString() || "");
postBodyData.set('property', formData.property.toString() || "");
postBodyData.set('balance', formData.balance.toString() || "");
postBodyData.set('preferred', formData.preferred.toString() || "");
postBodyData.set('amount', formData.loan.toString() || "");
postBodyData.set('message', formData.message.toString() || "");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: bodyData,
      });
      const post_config = {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/api/v1/add-applied-submission/`,
        data: postBodyData,
      };
      const post_response = await axios(post_config);
      const data = await response.json();
      console.log(data);
      setBtnLoader(false);
      setSuccess(data.message);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="contact-section mb-5" id="apply_now">
      <form onSubmit={sendEmail} id="contact-form">
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
            <div className="col-md-6 mt-3">
              <select
                name="referred"
                id="referred"
                className="form_control"
                aria-required="true"
                aria-invalid="false"
              >
                <option value={""}>Referred</option>
                <option value="Television Add">Television Add</option>
                <option value="Radio Add">Radio Add</option>
                <option value="Internet Search">Internet Search</option>
                <option value="Facebook">Facebook</option>
                <option value="Brochure">Brochure</option>
                <option value="Friend or Relative">Friend or Relative</option>
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <select
                name="homeowner"
                id="homeowner"
                className="form_control"
                aria-required="true"
                aria-invalid="false"
              >
                <option value={""}>Homeowner</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <input type="text" name="city" id="city" placeholder="City" />
            </div>
            <div className="col-md-6 mt-3">
              <select
                name="province"
                className="form_control"
                aria-invalid="false"
              >
                <option value={""}>Province/Territory</option>
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
            <div className="col-md-4 mt-3">
              <select
                name="mortgage"
                id="mortgage"
                className="form_control"
                aria-required="true"
                aria-invalid="false"
              >
                <option value={""}>Do You Have A Mortgage?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-md-4 mt-3">
              <input
                type="text"
                name="property"
                id="property"
                placeholder="Property Value ($)"
              />
            </div>
            <div className="col-md-4 mt-3">
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
                <option value={""}>My Preferred Contact Method is...</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Phone & Email both are fine">
                  Phone & Email both are fine
                </option>
              </select>
            </div>

            <div className="col-md-12 mt-3">
              <textarea
                name="message"
                id="message"
                style={{ height: "120px" }}
                placeholder="Reason for Loan"
              ></textarea>
            </div>
          </div>
          <input className="contactBtn mt-3" type="submit" value={btnLoader ? "Loading ..." : "Apply Now"} />
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
