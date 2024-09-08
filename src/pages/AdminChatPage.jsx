import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ContactsTable from '../components/ChatsTable';

const AdminChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 bg-gray-100">
          <ContactsTable />
        </main>
      </div>
    </div>
  );
};

export default AdminChatPage;
