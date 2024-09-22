import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import AdminTourPage from '../components/Tours';

const AdminChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 bg-gray-100">
          <AdminTourPage />
        </main>
      </div>
    </div>
  );
};

export default AdminChatPage;
