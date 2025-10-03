import { MenuItem } from './types';
import { 
  UsersIcon, 
  SparklesIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  TruckIcon, 
  UserGroupIcon, 
  ScaleIcon, 
  PlayCircleIcon, 
  EnvelopeIcon, 
  ArrowDownOnSquareStackIcon,
  GiftIcon,
  ArrowUpCircleIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  HomeIcon
} from './components/icons';

export const MENU_ITEMS: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon },
  { 
    name: 'Alunos', 
    icon: UsersIcon,
    subItems: [{ name: 'Gerenciar por van' }, { name: 'Indicados' }],
  },
  { 
    name: 'Inteligência Artificial', 
    icon: SparklesIcon,
    subItems: [{ name: 'Mensagens Automáticas' }],
  },
  { 
    name: 'Financeiro', 
    icon: ChartBarIcon,
    subItems: [{ name: 'Ganhos e Gastos' }, { name: 'Relatórios' }],
  },
  { 
    name: 'Mensalidades', 
    icon: CreditCardIcon,
    subItems: [{ name: 'Controle de Pagamentos' }],
  },
  { 
    name: 'Motorista', 
    icon: TruckIcon,
    subItems: [{ name: 'Checklist Diário' }],
  },
  { 
    name: 'Monitora', 
    icon: UserGroupIcon,
    subItems: [{ name: 'Controle de Presença' }],
  },
  { 
    name: 'Educação Financeira', 
    icon: ScaleIcon,
    subItems: [{ name: 'Divisão de Ganhos' }],
  },
  { 
    name: 'Tutoriais / Videoaulas', 
    icon: PlayCircleIcon,
    subItems: [{ name: 'Como usar o App' }],
  },
  { 
    name: 'Mensagens Prontas', 
    icon: EnvelopeIcon,
    subItems: [{ name: 'Enviar Manualmente' }],
  },
  { 
    name: 'Importar/Exportar', 
    icon: ArrowDownOnSquareStackIcon,
    subItems: [{ name: 'Planilhas de Alunos' }],
  },
  { 
    name: 'Ganhar com Indicação', 
    icon: GiftIcon,
    subItems: [{ name: 'Meu Código' }],
  },
  { 
    name: 'Upgrade', 
    icon: ArrowUpCircleIcon,
    subItems: [{ name: 'Ver Planos' }],
  },
  { 
    name: 'Suporte', 
    icon: QuestionMarkCircleIcon 
  },
  { 
    name: 'Perfil', 
    icon: UserCircleIcon
  },
];
