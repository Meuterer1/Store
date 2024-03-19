import React, { useState } from 'react';
import styled from 'styled-components';
import useMessage from '../api/hooks/useMessage';

import primaryTheme from '../theme/theme';
import Button from './Button';

const HelpSection = styled.section`
  display: flex;
  gap: 50px;
  margin: 50px 5%;

  .customer-care {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${primaryTheme.colors.gray};
    text-align: center;
    width: 40%;

    padding: 50px;

    border-radius: 20px;
    h3 {
      font-size: 30px;
      font-family: ${primaryTheme.fonts.headerFont};
      letter-spacing: 1.25px;
      margin-bottom: 15px;
    }
  }

  .customer-care-info {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
  }

  .form-inputs {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin-top: 30px;

    input {
      padding: 15px 30px;
      border-radius: 64px;
      width: 100%;
      border: 1px solid ${primaryTheme.colors.softGray};

      &:focus {
        outline: none;
      }
    }

    textarea {
      padding: 15px;
      resize: none;
      border-radius: 20px;
      border: 1px solid ${primaryTheme.colors.softGray};

      &:focus {
        outline: none;
      }
    }

    button {
      width: 100%;
    }
  }

  .terms_questions {
    border: 1px solid ${primaryTheme.colors.gray};
    border-radius: 20px;
    padding: 10px;
    height: 200px;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .terms {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    width: 60%;
    h2 {
      width: 100%;
      text-align: center;
      font-family: ${primaryTheme.fonts.headerFont};
      margin: 0 0 50px 0;
    }
    h3 {
      margin: 0 0 15px 0;
      font-family: ${primaryTheme.fonts.headerFont};
      text-align: center;
    }
  }

  ul {
    list-style: none;
    text-align: start;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 50px;

    .terms {
      width: 100%;
    }
    .customer-care {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .customer-care {
      padding: 30px;
    }
  }
`;

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
      message('success', 'Formularz został wysłany!');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      message('warning', 'Uzupełnij wszystkie pola formularza!');
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
              placeholder="Imię"
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
              placeholder="Temat"
              value={form.subject}
              onChange={handleInputChange}
            />
          </div>

          <textarea
            name="message"
            rows={4}
            cols={10}
            placeholder="Wiadomość: "
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
