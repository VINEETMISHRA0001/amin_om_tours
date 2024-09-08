import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VehicleTable from '../components/VehicleTable';

const AllVehicles = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ml-64">
        <Header />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 bg-gray-100">
          <VehicleTable />
        </main>
      </div>
    </div>
  );
};

export default AllVehicles;
