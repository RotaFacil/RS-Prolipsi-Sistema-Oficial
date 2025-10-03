import React from 'react';
import FinancialChart from './FinancialChart';
import QuickAccessCard from './QuickAccessCard';
import { UsersIcon, SparklesIcon, QuestionMarkCircleIcon } from './icons';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white border-b-2 border-amber-400 pb-2 mb-8">Dashboard</h1>

      {/* Financial Summary */}
      <div className="bg-zinc-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Resumo Financeiro</h2>
        <div style={{ height: '300px' }} className="w-full">
           <FinancialChart />
        </div>
        <div className="text-center mt-4">
            <p className="text-zinc-400">Lucro Líquido (Mês Atual)</p>
            <p className="text-3xl font-bold text-amber-400">R$ 4.500,00</p>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickAccessCard
            title="Alunos"
            description="Gerencie seus alunos e vans"
            icon={UsersIcon}
          />
          <QuickAccessCard
            title="IA / RSA"
            description="Envie mensagens automáticas"
            icon={SparklesIcon}
          />
          <QuickAccessCard
            title="Suporte"
            description="Fale com nossa equipe"
            icon={QuestionMarkCircleIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;