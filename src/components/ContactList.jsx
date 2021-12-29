import { ContactPreview } from './ContactPreview';
export function ContactList({ contacts }) {
  return (
    <div >
      {contacts && (
        <ul className="clean-list">
          {contacts.map((contact) => (
            <li key={contact._id}>
              <ContactPreview contact={contact} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
