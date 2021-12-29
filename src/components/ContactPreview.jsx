import { Link } from 'react-router-dom';

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`} className='contact-preview flex '>
      <div>
        <img
          src={`https://robohash.org/set_set5/${contact.name}?size=50x50`}
          alt=""
        />
      </div>
      <p>{contact.name}</p>
    </Link>
  );
}
