import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mês Anterior',
    Ganhos: 8000,
    Gastos: 4000,
  },
  {
    name: 'Mês Atual',
    Ganhos: 9500,
    Gastos: 5000,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 shadow-lg">
        <p className="font-bold text-amber-400">{label}</p>
        <p style={{ color: '#FBBF24' }}>{`Ganhos: R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
        <p style={{ color: '#71717A' }}>{`Gastos: R$ ${payload[1].value.toLocaleString('pt-BR')}`}</p>
      </div>
    );
  }
  return null;
};

const FinancialChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3F3F46" />
        <XAxis dataKey="name" tick={{ fill: '#a1a1aa' }} />
        <YAxis tick={{ fill: '#a1a1aa' }} tickFormatter={(value) => `R$${Number(value)/1000}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(236, 204, 104, 0.1)' }}/>
        <Legend wrapperStyle={{ color: '#E4E4E7' }} />
        <Bar dataKey="Ganhos" fill="#FBBF24" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Gastos" fill="#71717A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialChart;