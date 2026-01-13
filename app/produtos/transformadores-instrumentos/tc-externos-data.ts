// Dados dos modelos de TC Externos
// Baseado nos modelos encontrados no site: ICJ-1, ICSE-1, ICSE-2, ICSE-3, ICSE-4, ICSE-5, ICSE-6, ICSE-7, ICSE-8, ICSE-9, ICSE-10

export interface TCExternoModel {
  id: string;
  name: string;
  image: string;
  pdf?: string; // URL do PDF - adicionar quando disponível
}

export const tcExternosModels: TCExternoModel[] = [
  {
    id: 'icj-1',
    name: 'ICJ-1',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-2.jpg',
  },
  {
    id: 'icse-1',
    name: 'ICSE-1',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-4.jpg',
  },
  {
    id: 'icse-2',
    name: 'ICSE-2',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-6.jpg',
  },
  {
    id: 'icse-3',
    name: 'ICSE-3',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-8.jpg',
  },
  {
    id: 'icse-4',
    name: 'ICSE-4',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-10.jpg',
  },
  {
    id: 'icse-5',
    name: 'ICSE-5',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-12.jpg',
  },
  {
    id: 'icse-6',
    name: 'ICSE-6',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-14.jpg',
  },
  {
    id: 'icse-7',
    name: 'ICSE-7',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-16.jpg',
  },
  {
    id: 'icse-8',
    name: 'ICSE-8',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-18.jpg',
  },
  {
    id: 'icse-9',
    name: 'ICSE-9',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-20.jpg',
  },
  {
    id: 'icse-10',
    name: 'ICSE-10',
    image: '/images/produtos/instrumentos/tc-externos/tc-externo-22.jpg',
  },
];


