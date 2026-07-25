import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Navigation from "./Navigation";

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/products": "Products",
      "/stock-history": "Stock History",
      "/categories": "Categories",
    };

    document.title = `${pageTitles[pathname] ?? "Inventory"} | Inventory Management`;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {isMobileMenuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-gray-900 p-6 text-white transition-transform duration-200 lg:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded p-1 text-gray-300 hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <h1 className="mb-8 text-2xl font-bold">Inventory</h1>

          <Navigation onNavigate={() => setIsMobileMenuOpen(false)} />
        </aside>

        <main className="min-w-0 flex-1 lg:ml-64">
          <header className="sticky top-0 z-20 flex items-center gap-4 border-b bg-white px-4 py-4 sm:px-8">
            <button
              type="button"
              className="rounded p-1 text-gray-700 hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={26} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              Inventory Management System
            </h2>
          </header>

          <section className="p-4 sm:p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
