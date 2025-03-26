import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = ({ onSuccess }) => {
  const [state, handleSubmit] = useForm("mnnpvzyq");

  if (state.succeeded) {
    onSuccess(true);
    return <div className="thank-you">Thanks for getting in touch!</div>;
  }

  return (
    <div
      className={
        `contact-form` +
        (state.submitting ? " loading" : "") +
        (state.succeeded ? " success" : "")
      }
    >
      <h3>Request CV</h3>
      <form name="contact" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="form-name"
          value="contact"
          disabled={state.submitting}
        />
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            disabled={state.submitting}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            disabled={state.submitting}
          />
        </div>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            required
            disabled={state.submitting}
          />
        </div>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className={`button ${state.submitting ? "loading" : ""}`}
        />
      </form>
    </div>
  );
};

export default Contact;
