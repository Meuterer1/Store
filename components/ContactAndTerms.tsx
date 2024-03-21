import React, { useState } from 'react';

import useMessage from '../hooks/useMessage';

import primaryTheme from '../theme/theme';

import Button from '../standalones/Button';
import { HelpSection } from '../styled_components/HelpSection';

const ContactAndTerms = () => {
  const message = useMessage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (form.name.length && form.email && form.subject && form.message) {
      message('success', 'Form send successfully!');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      message('warning', 'Fill all form fields!');
    }
  };

  const handleInputChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelpSection>
      <div className="customer-care">
        <div className="customer-care-info">
          <h3>Customer Care</h3>
          <p>Are you unsure or concerned?</p>
          <p>We're always here to help! Get in touch</p>
          <p>
            by phone: <strong>123-456-789</strong> or via email:{' '}
            <strong>info@mysite.com</strong>
          </p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-inputs">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
            />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={handleInputChange}
            />
          </div>

          <textarea
            name="message"
            rows={4}
            cols={10}
            placeholder="Message: "
            value={form.message}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            content="Send"
            background={primaryTheme.colors.black}
            color={primaryTheme.colors.white}
          />
        </form>
      </div>
      <div className="terms">
        <h2>FAQ</h2>
        <div className="terms_questions">
          <h3>Returns Policy</h3>
          <ul>
            <li>
              You have 30 days to return products from the date of purchase.
            </li>
            <li>Products must be in their original condition and packaging.</li>
            <li>Make sure you have proof of purchase.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Delivery Costs</h3>
          <ul>
            <li>Free delivery for orders over 200 zł.</li>
            <li>Choose courier delivery, parcel locker, or personal pickup.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Quality Guarantee</h3>
          <ul>
            <li>All our products are covered by a two-year warranty.</li>
            <li>Contact us in case of defective or damaged products.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Data and Payment Security</h3>
          <ul>
            <li>Your data is safe with us, we ensure its protection.</li>
            <li>We use secure online payment methods.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Privacy Policy</h3>
          <ul>
            <li>
              Read our privacy policy to learn what data we collect and how we
              use it.
            </li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Customer Service</h3>
          <ul>
            <li>We are available Monday to Friday from 9:00 to 17:00.</li>
            <li>
              Contact us at phone number
              <strong>123-456-789</strong>
            </li>
            <li>
              or email address: <strong>info@mysite.com</strong>
            </li>
          </ul>
        </div>
      </div>
    </HelpSection>
  );
};

export default ContactAndTerms;
