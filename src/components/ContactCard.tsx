import React, { useState, useEffect } from 'react';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';
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
        <input className="name" type="text" value={name}></input>

        <div className="title-icons">
          <AiOutlineEdit />
          <AiOutlineDelete onClick={async () => remove(id)} />
        </div>
      </div>

      <div className="info">
        {email && (
          <div className="contact">
            <AiOutlineMail />
            <input className="contact-field" type="text" value={email}></input>
          </div>
        )}

        {phone && (
          <div className="contact">
            <AiOutlinePhone />
            <input className="contact-field" type="text" value={phone}></input>
          </div>
        )}

        {whatsapp && (
          <div className="contact">
            <BsWhatsapp />
            <input
              className="contact-field"
              type="text"
              value={whatsapp}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
