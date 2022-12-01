export class ErrorMessages {
  public static Create = 'Unable to add contact';
  public static Update = 'Unable to update contact';
  public static Remove = 'Unable to remove contact';
  public static NoName = 'Name field is required';
  public static NoInfo = 'At least one contact information is required';
  public static InvalidEmail = 'Provided email is invalid';
  public static NoConnection = 'Could not connect to server';
  public static NoContacts =
    'No contacts were found, you can add some of your own';
}

export class SuccessMessages {
  public static Created = 'Contact added successfully';
  public static Updated = 'Contact updated successfully';
  public static Removed = 'Contact removed successfully';
  public static Loaded = 'Contacts loaded successfully';
}
