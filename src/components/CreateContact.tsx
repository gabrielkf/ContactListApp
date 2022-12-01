import React, { useState } from 'react';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { IContact } from '../entities/Contact';

interface ICreateProps {
  cancelCreate(): void;
  updateCards(contact: IContact): void;
}

function CreateContact({ cancelCreate, updateCards }: ICreateProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<number>();
  const [whatsapp, setWhatsapp] = useState<number>();

  function confirm() {}

  return (
    <div className="card">
      <div className="title">
        <input
          className="name edit"
          type="text"
          value={name}
          onChange={e => setName(e.target.value.trim())}
        ></input>

        <div className="title-icons">
          <>
            <AiFillCloseCircle
              className="cancel"
              onClick={() => cancelCreate()}
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
            onChange={e => setEmail(e.target.value.trim())}
          ></input>
        </div>

        <div className="contact">
          <AiOutlinePhone />
          <input
            className="contact-field edit"
            type="number"
            value={phone}
            onChange={e => setPhone(+e.target.value)}
          ></input>
        </div>

        <div className="contact">
          <BsWhatsapp />
          <input
            className="contact-field edit"
            type="number"
            value={whatsapp}
            onChange={e => setWhatsapp(+e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default CreateContact;
