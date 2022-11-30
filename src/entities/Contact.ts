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
