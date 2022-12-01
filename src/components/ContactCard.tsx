import React, { useState, useEffect } from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlineDelete } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { IContact, Contact } from '../entities/Contact';
import { removeContact } from '../services/apiService';

interface ICardProps extends IContact {
  removeCard(id: string): void;
}

function ContactCard({
  id,
  name,
  email,
  phone,
  whatsapp,
  removeCard,
}: ICardProps) {
  async function remove(id: string) {
    try {
      await removeContact(id);
      removeCard(id);
    } catch (error) {
      // todo: handle error
    }
  }

  return (
    <div className="card">
      <div className="title">
        <h1>{name}</h1>

        <div className="title-icons">
          <AiOutlineDelete onClick={async () => remove(id)} />
        </div>
      </div>

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
