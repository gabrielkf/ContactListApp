import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { ContactData, IContact, validContactData } from '../entities/Contact';
import { ErrorMessages, SuccessMessages } from '../entities/DefaultMessages';
import { HttpException } from '../entities/HttpException';
import { createContact } from '../services/apiService';

interface ICreateProps {
  setCreateFalse(): void;
  updateCards(contact: IContact): void;
}

function CreateContact({ setCreateFalse, updateCards }: ICreateProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<number>();
  const [whatsapp, setWhatsapp] = useState<number>();

  async function confirm(): Promise<void> {
    const contactData = new ContactData({
      name: name.trim(),
      email: email.trim(),
      phone,
      whatsapp,
    });

    if (!validContactData(contactData)) {
      toast.error(
        !contactData.name ? ErrorMessages.NoName : ErrorMessages.NoInfo
      );
      return;
    }

    try {
      const newContact = await createContact(contactData);

      if (!newContact) {
        throw new HttpException();
      }

      updateCards(newContact);
      setCreateFalse();
      toast.success(SuccessMessages.Created);
    } catch (error) {
      if (error instanceof HttpException) {
        toast.error(error.message);
      } else {
        toast.error(ErrorMessages.Create);
      }
    }
  }

  return (
    <div className="card">
      <div className="title">
        <input
          className="name edit"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        ></input>

        <div className="title-icons">
          <>
            <AiFillCloseCircle
              className="cancel"
              onClick={() => setCreateFalse()}
            />
            <AiFillCheckCircle
              className="confirm"
              onClick={async () => confirm()}
            />
          </>
        </div>
      </div>

      <div className="info">
        <div className="contact">
          <AiOutlineMail />
          <input
            className={`contact-field edit && 'edit'}`}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          ></input>
        </div>

        <div className="contact">
          <AiOutlinePhone />
          <input
            className="contact-field edit"
            type="number"
            value={phone}
            onChange={e => setPhone(+e.target.value)}
            placeholder="Phone number"
          ></input>
        </div>

        <div className="contact">
          <BsWhatsapp />
          <input
            className="contact-field edit"
            type="number"
            value={whatsapp}
            onChange={e => setWhatsapp(+e.target.value)}
            placeholder="Whatsapp"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default CreateContact;
