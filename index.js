import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.js';

import { Command } from 'commander';
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsAll = await listContacts();
      return console.table(contactsAll);
    case 'get':
      const contact = await getContactById(id);
      return console.log(contact);
    case 'add':
      const add = await addContact({ name, email, phone });
      return console.log(add);
    case 'remove':
      const delContact = await removeContact(id);
      return console.log(delContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
