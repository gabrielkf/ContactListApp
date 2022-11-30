import React, { useState, useEffect } from 'react';
import { Contact } from './entities/Contact';
import { listContacts } from './services/apiService';
import './App.scss';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

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
      {contacts.map(contact => (
        <div>
          <h4>{contact.name}</h4>
          <ul>
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
            <li>{contact.whatsapp}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
