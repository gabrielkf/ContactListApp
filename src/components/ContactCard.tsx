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
  const [cardName, setCardName] = useState<string>(name);
  const [cardEmail, setCardEmail] = useState<string>(email || '');
  const [cardPhone, setCardPhone] = useState<number>();
  const [cardWhats, setCardWhats] = useState<number>();
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (phone) setCardPhone(phone);
    if (whatsapp) setCardWhats(whatsapp);
  }, [phone, whatsapp]);

  async function remove(id: string) {
    try {
      await removeContact(id);
      removeCard(id);
    } catch (error) {
      // todo: show error toast
    }
  }

  return (
    <div className="card">
      <div className="title">
        <input
          className={`name ${edit && 'edit'}`}
          type="text"
          value={cardName}
          readOnly={!edit}
          onChange={e => setCardName(e.target.value)}
        ></input>

        <div className="title-icons">
          <AiOutlineEdit onClick={() => setEdit(!edit)} />
          <AiOutlineDelete onClick={async () => remove(id)} />
        </div>
      </div>

      <div className="info">
        {(email || edit) && (
          <div className="contact">
            <AiOutlineMail />
            <input
              className={`contact-field ${edit && 'edit'}`}
              type="text"
              value={cardEmail}
              readOnly={!edit}
              onChange={e => setCardEmail(e.target.value)}
            ></input>
          </div>
        )}

        {(phone || edit) && (
          <div className="contact">
            <AiOutlinePhone />
            <input
              className={`contact-field ${edit && 'edit'}`}
              type="number"
              value={cardPhone}
              readOnly={!edit}
              onChange={e => setCardPhone(+e.target.value)}
            ></input>
          </div>
        )}

        {(whatsapp || edit) && (
          <div className="contact">
            <BsWhatsapp />
            <input
              className={`contact-field ${edit && 'edit'}`}
              type="number"
              value={cardWhats}
              readOnly={!edit}
              onChange={e => setCardWhats(+e.target.value)}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
