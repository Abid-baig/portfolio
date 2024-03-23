import React from "react";
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import Split from '../Split';

const ContactWithMap = ({ theme = "dark" }) => {
  const messageRef = React.useRef(null);
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendMessage = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <>
      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="form md-mb50">
                <h4 className="extra-title mb-50">Get In Touch.</h4>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    message: "",
                  }}
                  onSubmit={async (values) => {
                    await sendMessage(500);
                    const formData = new FormData();

                    formData.append('name', values.name);
                    formData.append('email', values.email);
                    formData.append('message', values.message);

                    const res = axios
                      .post("/api/mail", {
                        name: values.name,
                        email: values.email,
                        message: values.message,
                      })
                      .then((res) => {
                        if (res.status === 200) {
                        } else {
                          setLoading(false);

                        }
                      })
                      .catch((err) => {
                        console.log(err)
                      });

                    if (!res) return;

                    messageRef.current.innerText =
                      "Your Message has been successfully sent. I will contact you soon.";
                    // Reset the values
                    values.name = "";
                    values.email = "";
                    values.message = "";
                    // clear message
                    setTimeout(() => {
                      messageRef.current.innerText = "";
                    }, 2000);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form id="contact-form">
                      <div className="messages" ref={messageRef}></div>

                      <div className="controls">
                        <div className="form-group">
                          <Field
                            id="form_name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            style={{ color: 'black' }}
                            required="required"
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            validate={validateEmail}
                            id="form_email"
                            type="email"
                            name="email"
                            style={{ color: 'black' }}
                            placeholder="Email"
                            required="required"
                          />
                          {errors.email && touched.email && (
                            <div>{errors.email}</div>
                          )}
                        </div>

                        <div className="form-group">
                          <Field
                            as="textarea"
                            id="form_message"
                            name="message"
                            style={{ color: 'black' }}
                            placeholder="Message"
                            rows="4"
                            required="required"
                          />
                        </div>

                        <button type="submit" className={`btn-curve 'btn-lit'} disabled`}>
                          <span>Send Message</span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="cont-info">
                <h4 className="extra-title mb-50">Contact Info.</h4>
                <Split>
                  <h3 className="custom-font wow" data-splitting>
                    Let&apos;s Talk.
                  </h3>
                </Split>
                <div className="item mb-40">
                  <h5>
                    <a href="#0">imransoftwaredev09@gmail.com</a>
                    <a href="#0"></a>
                  </h5>
                  <h5>+1(470)660-3648</h5>
                </div>
                <Split>
                  <h3 className="custom-font wow" data-splitting>
                    Address.
                  </h3>
                </Split>
                <div style={{ display: 'flex' }} className="item">
                  <h6>
                    Scranton, Pennsylvania, USA
                  </h6>
                  <a style={{marginLeft: '16px'}} href="https://github.com/Imran-softwaredev" className="icon">
                    <i className="fab fa-github"></i>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-half sub-bg">
        <div className="container">
          <div className="copyrights text-center mt-0">
            <p>
              <a href="#0">Imran Khan Portfolio</a>.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactWithMap;
