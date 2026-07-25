import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-900 p-6 text-white">
          <h1 className="mb-8 text-2xl font-bold">Inventory</h1>

          <Navigation />
        </aside>

        <main className="flex-1">
          <header className="border-b bg-white px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Inventory Management System
            </h2>
          </header>

          <section className="p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
