const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json")

async function listContacts() {
  try {
      const contacts = await fs.readFile(contactsPath)
      return JSON.parse(contacts);
  } catch (error) {
    return error
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex !== -1) {
        const [delContact] = contacts.splice(contactIndex, 1);
        try {
            await fs.writeFile(
              contactsPath,
              JSON.stringify(contacts, null, 2)
            );
        } catch (error) {
            return error;
        }
        return delContact
    }
    return null
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
     try {
       await fs.writeFile(
         contactsPath,
         JSON.stringify(contacts, null, 2)
       );
     } catch (error) {
       return error;
     }
    return newContact
}

module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact,
}