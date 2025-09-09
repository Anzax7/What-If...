import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

interface SimulationChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  scenario: string;
  chartType: 'bar' | 'line' | 'pie';
  onChartTypeChange: (type: 'bar' | 'line' | 'pie') => void;
}

export const SimulationChart = ({ data, scenario, chartType, onChartTypeChange }: SimulationChartProps) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366f1" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        );
    }
  };

  return (
    <div className="h-64 w-full">
      <div className="flex justify-end mb-2">
        <div className="flex gap-2">
          <button 
            onClick={() => onChartTypeChange('bar')} 
            className={`px-2 py-1 text-xs rounded ${chartType === 'bar' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
          >
            Bar
          </button>
          <button 
            onClick={() => onChartTypeChange('line')} 
            className={`px-2 py-1 text-xs rounded ${chartType === 'line' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
          >
            Line
          </button>
          <button 
            onClick={() => onChartTypeChange('pie')} 
            className={`px-2 py-1 text-xs rounded ${chartType === 'pie' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
          >
            Pie
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};