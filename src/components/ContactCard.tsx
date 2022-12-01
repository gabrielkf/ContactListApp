import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
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
import { ErrorMessages, SuccessMessages } from '../entities/DefaultMessages';
import { HttpException } from '../entities/HttpException';
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
      resetFields();
      setEdit(false);
    }
  }

  function resetFields() {
    setCardName(name);
    setCardEmail(email || '');
    setCardPhone(phone);
    setCardWhats(whatsapp);
  }

  async function remove() {
    try {
      await removeContact(id);
      removeCard(id);
    } catch (error) {
      if (error instanceof HttpException) {
        toast.error(error.message);
      } else {
        toast.error(ErrorMessages.Remove);
      }
    }
  }

  async function update() {
    try {
      const contactData = new ContactData({
        name: cardName.trim(),
        email: cardEmail.trim(),
        phone: cardPhone,
        whatsapp: cardWhats,
      });

      if (!validContactData(contactData)) {
        toast.error(
          !contactData.name ? ErrorMessages.NoName : ErrorMessages.NoInfo
        );

        resetFields();
        setEdit(false);
        return;
      }

      await updateContact(id, contactData);
      updateCards({ ...contactData, id });
      toast.success(SuccessMessages.Updated);
    } catch (error) {
      if (error instanceof HttpException) {
        toast.error(error.message);
      } else {
        toast.error(ErrorMessages.Update);
      }
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
