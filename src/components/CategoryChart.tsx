import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type CategoryChartData = {
  category: string;
  productCount: number;
};

type CategoryChartProps = {
  data: CategoryChartData[];
};

const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Products by Category
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Number of products in each category
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="productCount"
              name="Products"
              fill="#111827"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
