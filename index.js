const contacts = require("./contacts")

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
  
// console.log("process.argv", process.argv);

program.parse();

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        //   const contacts = await contacts.listContacts();
          console.table(await contacts.listContacts());
      break;

    case "get":
      console.log(await contacts.getContactById(id));
      break;

    case "add":
      console.log(
        await contacts.addContact(name, email, phone)
      );
      break;

    case "remove":
        console.log(await contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
