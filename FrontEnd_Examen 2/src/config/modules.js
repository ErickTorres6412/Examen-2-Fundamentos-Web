import { Package, User } from 'lucide-react';

const modules = [
  {
    title: 'Departamentos',
    icon: Package,
    subItems: [
      { label: 'Departamentos', link: '/departamentos' }
    ]
  },
  {
    title: 'Personas',
    icon: User,
    subItems: [
      { label: 'Personas', link: '/personas' }
    ]
  }
];

export default modules;
