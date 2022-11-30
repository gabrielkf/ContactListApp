import React, { useState, useEffect } from 'react';
import { Contact, IContact } from '../entities/Contact';

function ContactCard({ id, name, email, phone, whatsapp }: IContact) {
  return (
    <div className="card">
      <h1>{name}</h1>
      {/* todo: edit and delete buttons */}

      <div className="info">
        {/* todo: use contact icons */}
        <p>{email}</p>
        <p>{phone}</p>
        <p>{whatsapp}</p>
      </div>
    </div>
  );
}

export default ContactCard;
