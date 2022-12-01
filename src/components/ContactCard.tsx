import React, { useState, useEffect } from 'react';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { IContact, ContactData, validContactData } from '../entities/Contact';
import { removeContact, updateContact } from '../services/apiService';

interface ICardProps extends IContact {
  removeCard(id: string): void;
  updateCards(contact: IContact): void;
}

function ContactCard({
  id,
  name,
  email,
  phone,
  whatsapp,
  removeCard,
  updateCards,
}: ICardProps) {
  const [cardName, setCardName] = useState<string>(name);
  const [cardEmail, setCardEmail] = useState<string>(email || '');
  const [cardPhone, setCardPhone] = useState<number>();
  const [cardWhats, setCardWhats] = useState<number>();
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    if (phone) setCardPhone(phone);
    if (whatsapp) setCardWhats(whatsapp);
  }, [phone, whatsapp]);

  async function confirmAction() {
    if (confirmDelete) return remove();
    else return update();
  }

  function cancelAction() {
    if (confirmDelete) {
      setConfirmDelete(false);
    } else {
      setCardName(name);
      setCardEmail(email || '');
      setCardPhone(phone);
      setCardWhats(whatsapp);
      setEdit(false);
    }
  }

  async function remove() {
    try {
      await removeContact(id);
      removeCard(id);
    } catch (error) {
      // todo: show error toast
    }
  }

  async function update() {
    try {
      const contactData = new ContactData({
        name: cardName,
        email: cardEmail,
        phone: cardPhone,
        whatsapp: cardWhats,
      });

      if (!validContactData(contactData)) {
        // todo: show error toast
      }

      await updateContact(id, contactData);
      updateCards({ ...contactData, id });
    } catch {
      // todo: show error toast
    }

    setEdit(false);
  }

  return (
    <div className="card">
      <div className="title">
        <input
          className={`name ${edit && 'edit'}`}
          type="text"
          value={cardName}
          readOnly={!edit}
          onChange={e => setCardName(e.target.value.trim())}
        ></input>

        <div className="title-icons">
          {!edit && !confirmDelete ? (
            <>
              <AiOutlineEdit onClick={() => setEdit(!edit)} />
              <AiOutlineDelete onClick={() => setConfirmDelete(true)} />
            </>
          ) : (
            <>
              <AiFillCloseCircle
                className="cancel"
                onClick={() => cancelAction()}
              />
              <AiFillCheckCircle
                className="confirm"
                onClick={async () => confirmAction()}
              />
            </>
          )}
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
              onChange={e => setCardEmail(e.target.value.trim())}
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
