import React, { useState } from 'react';
import useMessage from '../api/hooks/useMessage';

import './styles/ContactAndTerms.scss';

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
    <>
      <div className="customer_care">
        <div className="customer_care_info">
          <h3>Customer Care</h3>
          <p>Masz wątpliwości lub obawy?</p>
          <p>Zawsze jesteśmy gotowi pomóc! Skontaktuj się z nami</p>
          <p>
            telefonicznie: <strong>123-456-789</strong> lub mailowo:{' '}
            <strong>info@mysite.com</strong>
          </p>
        </div>
        <div className="customer_care_form">
          <form onSubmit={handleFormSubmit}>
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
            <textarea
              name="message"
              rows={4}
              cols={10}
              placeholder="Wiadomość: "
              value={form.message}
              onChange={handleInputChange}
            />
            <button type="submit">Wyślij</button>
          </form>
        </div>
      </div>
      <div className="terms">
        <h2>FAQ</h2>
        <div className="terms_questions">
          <h3>Polityka zwrotów</h3>
          <ul>
            <li>Masz 30 dni na zwrot produktów od daty zakupu.</li>
            <li>Produkty muszą być w oryginalnym stanie i opakowaniu.</li>
            <li>Upewnij się, że masz dowód zakupu.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Koszty dostawy</h3>
          <ul>
            <li>Darmowa dostawa przy zamówieniach powyżej 200 zł.</li>
            <li>Wybierz dostawę kurierem, paczkomatem lub odbiór osobisty.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Gwarancja jakości</h3>
          <ul>
            <li>Wszystkie nasze produkty objęte są dwuletnią gwarancją.</li>
            <li>
              Skontaktuj się z nami w przypadku produktów wadliwych lub
              uszkodzonych.
            </li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Bezpieczeństwo danych i płatności</h3>
          <ul>
            <li>Twoje dane są u nas bezpieczne, dbamy o ich ochronę.</li>
            <li>Korzystamy z bezpiecznych metod płatności online.</li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Polityka prywatności</h3>
          <ul>
            <li>
              Przeczytaj naszą politykę prywatności, aby dowiedzieć się, jakie
              dane zbieramy i jak je wykorzystujemy.
            </li>
          </ul>
        </div>
        <div className="terms_questions">
          <h3>Obsługa klienta</h3>
          <ul>
            <li>
              Jesteśmy dostępni od poniedziałku do piątku od 9:00 do 17:00.
            </li>
            <li>
              Skontaktuj się z nami pod numerem telefonu
              <strong>123-456-789</strong>
            </li>
            <li>
              lub adresem e-mail: <strong>info@mysite.com</strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactAndTerms;
