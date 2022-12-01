import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Contact, IContact } from './entities/Contact';
import { listContacts } from './services/apiService';
import './App.scss';
import ContactCard from './components/ContactCard';
import CreateContact from './components/CreateContact';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [create, setCreate] = useState<boolean>(false);

  useEffect(() => {
    async function getContacts(): Promise<void> {
      try {
        const contactList: Contact[] = await listContacts();
        setContacts(contactList.sort((a, b) => sortByName(a, b)));
      } catch (error) {
        // todo: show error toast
      }
    }

    getContacts();
  }, []);

  function removeCard(id: string) {
    setContacts(contacts.filter(c => c.id !== id));
  }

  function updateCards(contact: IContact) {
    const filtered = contacts.filter(c => c.id !== contact.id);
    const sorted = [...filtered, contact].sort((a, b) => sortByName(a, b));
    setContacts(sorted);
  }

  function sortByName(a: IContact, b: IContact) {
    return a.name < b.name ? -1 : 1;
  }

  function cancelCreate(): void {
    setCreate(false);
  }

  return (
    <div className="App">
      <div className="header">
        <AiOutlinePlusCircle size={40} onClick={() => setCreate(true)} />
        <p>Add contact</p>
      </div>

      {create && (
        <div className="container">
          <CreateContact
            cancelCreate={cancelCreate}
            updateCards={updateCards}
          />
        </div>
      )}

      <div className="container">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            whatsapp={contact.whatsapp}
            removeCard={removeCard}
            updateCards={updateCards}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
