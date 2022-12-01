export interface IContact {
  id: string;
  name: string;
  email?: string;
  phone?: number;
  whatsapp?: number;
}

export class Contact implements IContact {
  constructor(contactProps: IContact) {
    this.id = contactProps.id;
    this.name = contactProps.name;
    this.phone = contactProps.phone;
    this.email = contactProps.email;
    this.whatsapp = contactProps.whatsapp;
  }

  id: string;
  name: string;
  email?: string | undefined;
  phone?: number | undefined;
  whatsapp?: number | undefined;
}

export class ContactData implements Omit<IContact, 'id'> {
  constructor(contactProps: Omit<IContact, 'id'>) {
    this.name = contactProps.name;
    this.phone = contactProps.phone;
    this.email = contactProps.email;
    this.whatsapp = contactProps.whatsapp;
  }

  public name: string;
  public email?: string | undefined;
  public phone?: number | undefined;
  public whatsapp?: number | undefined;
}
