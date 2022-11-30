import React, { useState, useEffect } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { Contact, IContact } from '../entities/Contact';

function ContactCard({ id, name, email, phone, whatsapp }: IContact) {
  return (
    <div className="card">
      <h1>{name}</h1>
      {/* todo: edit and delete buttons */}

      <div className="info">
        {email && (
          <div className="contact">
            <AiOutlineMail />
            <p>{email}</p>
          </div>
        )}
        {phone && (
          <div className="contact">
            <AiOutlinePhone />
            <p>{phone}</p>
          </div>
        )}
        {whatsapp && (
          <div className="contact">
            <BsWhatsapp />
            <p>{whatsapp}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
