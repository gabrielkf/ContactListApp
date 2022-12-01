import React, { useState, useEffect } from 'react';
import { Contact, IContact } from './entities/Contact';
import { listContacts } from './services/apiService';
import './App.scss';
import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  function removeCard(id: string) {
    setContacts(contacts.filter(c => c.id !== id));
  }

  function updateCards(contact: IContact) {
    const filtered = contacts.filter(c => c.id !== contact.id);
    const sorted = [...filtered, contact].sort((a, b) => sortByName(a, b));
    setContacts(sorted);
  }

  useEffect(() => {
    async function getContacts(): Promise<void> {
      try {
        const contactList: Contact[] = await listContacts();
        setContacts(contactList.sort((a, b) => sortByName(a, b)));
      } catch (error) {
        // todo: handle error
      }
    }

    getContacts();
  }, []);

  function sortByName(a: IContact, b: IContact) {
    return a.name < b.name ? -1 : 1;
  }

  return (
    <div className="App">
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
