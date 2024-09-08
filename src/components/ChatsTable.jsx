import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from './../features/contact/contactSlice';
import EditContactModal from './EditModal'; // Import the modal
import { FaDumpster, FaRegEdit } from 'react-icons/fa';
import Loader from './Loader';

const ContactsTable = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);
  const [editContact, setEditContact] = useState(null); // State to control modal

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Contact Messages
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300 bg-white">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Thoughts
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td className="px-6 py-6">{contact.mobile}</td>
                <td className="px-6 py-6">{contact.email}</td>
                <td className="px-6 py-6 truncate max-w-xs">
                  {contact.message}
                </td>
                <td className="px-6 py-4 truncate max-w-xs">
                  {contact.thoughts}
                </td>
                <td className="px-6 py-6">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-6 flex justify-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => setEditContact(contact)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelete(contact._id)}
                  >
                    <FaDumpster />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Edit Modal when Edit button is clicked */}
      {editContact && (
        <EditContactModal
          contact={editContact}
          closeModal={() => setEditContact(null)} // Close modal
        />
      )}
    </div>
  );
};

export default ContactsTable;
