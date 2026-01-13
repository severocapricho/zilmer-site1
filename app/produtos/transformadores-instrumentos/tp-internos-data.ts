// Dados dos modelos de TP Internos
// Baseado nos modelos encontrados no site: IPSK, IPSH, IPSBF, IPSG-FT, IPSG-FF, IPSGF, IPSD, IPSB-24, IPSB, IPS-2A, IPSA

export interface TPInternoModel {
  id: string;
  name: string;
  image: string;
  pdf?: string; // URL do PDF - adicionar quando disponível
}

export const tpInternosModels: TPInternoModel[] = [
  {
    id: 'ipsk',
    name: 'IPSK',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-2.jpg',
    // pdf: '/pdfs/ipsk.pdf' // Adicionar quando disponível
  },
  {
    id: 'ipsh',
    name: 'IPSH',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-4.jpg',
  },
  {
    id: 'ipsbf',
    name: 'IPSBF',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-6.jpg',
  },
  {
    id: 'ipsg-ft',
    name: 'IPSG-FT',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-8.jpg',
  },
  {
    id: 'ipsg-ff',
    name: 'IPSG-FF',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-10.jpg',
  },
  {
    id: 'ipsgf',
    name: 'IPSGF',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-12.jpg',
  },
  {
    id: 'ipsd',
    name: 'IPSD',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-14.jpg',
  },
  {
    id: 'ipsb-24',
    name: 'IPSB-24',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-16.jpg',
  },
  {
    id: 'ipsb',
    name: 'IPSB',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-18.jpg',
  },
  {
    id: 'ips-2a',
    name: 'IPS-2A',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-20.jpg',
  },
  {
    id: 'ipsa',
    name: 'IPSA',
    image: '/images/produtos/instrumentos/tp-internos/tp-interno-22.jpg',
  },
];


