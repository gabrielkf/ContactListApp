export interface IContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
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
  phone?: string | undefined;
  email?: string | undefined;
  whatsapp?: string | undefined;
}
