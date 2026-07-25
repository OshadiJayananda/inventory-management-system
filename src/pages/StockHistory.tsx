import { useState } from "react";
import type { StockHistory as StockHistoryType } from "../utils/types";
import { getStockHistory } from "../utils/stockHistoryStorage";

const StockHistory = () => {
  const [history] = useState<StockHistoryType[]>(() => {
    return getStockHistory();
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock History</h1>

        <p className="mt-2 text-gray-500">
          Track all stock increases and decreases
        </p>
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          {history.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No stock history found.</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {history.map((record) => (
                  <tr key={record.id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {record.productName}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          record.type === "increase"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.type === "increase"
                          ? "Stock Increased"
                          : "Stock Decreased"}
                      </span>
                    </td>

                    <td
                      className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                        record.type === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.type === "increase" ? "+" : "-"}
                      {record.quantity}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {formatDate(record.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockHistory;
