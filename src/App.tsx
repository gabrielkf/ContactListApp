import React, { useState, useEffect } from 'react';
import { Contact } from './entities/Contact';
import { listContacts } from './services/apiService';
import './App.scss';
import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  function removeCard(id: string) {
    setContacts(contacts.filter(c => c.id !== id));
  }

  useEffect(() => {
    async function getContacts(): Promise<void> {
      try {
        const contactList: Contact[] = await listContacts();
        setContacts(contactList);
      } catch (error) {
        // todo: handle error
      }
    }

    getContacts();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {contacts.map(contact => (
          <ContactCard
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            whatsapp={contact.whatsapp}
            removeCard={removeCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
