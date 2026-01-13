// Dados dos modelos de TC Internos
// Baseado nos modelos encontrados no site: ICJ-4, ICJ-5, ICJ-6, ICJ-10, ICJ-11, ICJ-13, ICJ-14, ICS, ICSJO, ICSJ, ICSA, ICSJ-7,2, ICSH, ICSDB, ICSG

export interface TCInternoModel {
  id: string;
  name: string;
  image: string;
  pdf?: string; // URL do PDF - adicionar quando disponível
}

export const tcInternosModels: TCInternoModel[] = [
  {
    id: 'icj-4',
    name: 'ICJ-4',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-2.jpg',
  },
  {
    id: 'icj-5',
    name: 'ICJ-5',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-4.jpg',
  },
  {
    id: 'icj-6',
    name: 'ICJ-6',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-6.jpg',
  },
  {
    id: 'icj-10',
    name: 'ICJ-10',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-8.jpg',
  },
  {
    id: 'icj-11',
    name: 'ICJ-11',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-10.jpg',
  },
  {
    id: 'icj-13',
    name: 'ICJ-13',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-12.jpg',
  },
  {
    id: 'icj-14',
    name: 'ICJ-14',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-14.jpg',
  },
  {
    id: 'ics',
    name: 'ICS',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-16.jpg',
  },
  {
    id: 'icsjo',
    name: 'ICSJO',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-18.jpg',
  },
  {
    id: 'icsj',
    name: 'ICSJ',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-20.jpg',
  },
  {
    id: 'icsa',
    name: 'ICSA',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-22.jpg',
  },
  {
    id: 'icsj-72',
    name: 'ICSJ-7.2',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-24.jpg',
  },
  {
    id: 'icsh',
    name: 'ICSH',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-26.jpg',
  },
  {
    id: 'icsdb',
    name: 'ICSDB',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-28.jpg',
  },
  {
    id: 'icsg',
    name: 'ICSG',
    image: '/images/produtos/instrumentos/tc-internos/tc-interno-30.jpg',
  },
];

