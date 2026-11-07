export interface Service {
  slug: string;
  navName: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  intro: string;
  items: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  heroImage: string;
}

export const services: Service[] = [
  {
    slug: 'consultoria-tributaria',
    navName: 'Consultoría Tributaria',
    title: 'Consultoría y Asesoría Tributaria',
    seoTitle: 'Consultoría y Asesoría Tributaria en Santiago | ATLC',
    seoDescription:
      'Asesoría tributaria para empresas, pymes, grupos empresariales y personas en Santiago: consultoría permanente, reorganizaciones, due diligence y compliance tributario.',
    summary:
      'Asesoría en materias impositivas y cumplimiento tributario para empresas, personas y sus patrimonios familiares.',
    intro:
      'Brindamos asesoría en materias impositivas de consultoría y cumplimiento tributario para empresas, personas y sus patrimonios familiares y personales.',
    items: [
      'Asesoría tributaria a emprendedores, pymes, grupos empresariales, empresas familiares y personas naturales',
      'Consultoría tributaria permanente mensual y anual',
      'Asesoría en reorganizaciones empresariales',
      'Family Office',
      'Incorporación de nuevos negocios y estructuración de inversiones nacionales y extranjeras',
      'Diagnóstico y beneficios tributarios relacionados a la industria donde operan nuestros clientes',
      'Informes periciales contables y tributarios',
      'Apoyo en la planificación de operaciones para evitar contingencias en procesos de fiscalización por el SII',
      'Asesoría en actuaciones administrativas, fiscalizaciones y litigios ante el SII',
      'Due diligence tributarios',
      'Compliance tributario',
    ],
    image: '/img/consultoria-tributaria.jpg',
    imageAlt: 'Consultoría y asesoría tributaria',
    imageWidth: 613,
    imageHeight: 802,
    heroImage: '/img/bg-title-3.webp',
  },
  {
    slug: 'auditoria-financiera',
    navName: 'Auditoría Financiera',
    title: 'Auditoría Financiera',
    seoTitle: 'Auditoría Financiera y de Estados Financieros en Santiago | ATLC',
    seoDescription:
      'Auditoría de estados financieros y para efectos fiscales en Santiago. Asesoría en convergencia a normas IFRS y consultoría en aspectos contables.',
    summary:
      'Auditoría de estados financieros y para efectos fiscales, con asesoría en convergencia a normas IFRS.',
    intro:
      'La auditoría financiera es un proceso fundamental en los negocios, motivo por el cual nuestros servicios buscan que nuestros clientes se sientan seguros y confiados en que el dictamen sobre la razonabilidad de los estados financieros refleja fielmente la situación de su información contable.',
    items: [
      'Auditoría de estados financieros',
      'Auditoría para efectos fiscales',
      'Gerenciamiento externo en materia de estados financieros',
      'Supervisión contable',
      'Asesoría en procesos de convergencia a normas IFRS',
      'Consultoría en aspectos contables',
    ],
    image: '/img/auditorias-financieras.jpg',
    imageAlt: 'Auditoría financiera de estados financieros',
    imageWidth: 645,
    imageHeight: 800,
    heroImage: '/img/bg-title-3.webp',
  },
  {
    slug: 'outsourcing-contable',
    navName: 'Outsourcing Contable',
    title: 'Outsourcing Contable y de Remuneraciones',
    seoTitle: 'Outsourcing Contable y de Remuneraciones en Santiago | ATLC',
    seoDescription:
      'Outsourcing contable en Santiago: preparación de informes financieros periódicos, balances y estados de resultados, y gestión de recursos humanos y remuneraciones.',
    summary:
      'Externalización de la contabilidad, los informes financieros periódicos y la gestión de remuneraciones.',
    intro:
      'Externalizar la contabilidad y la gestión de remuneraciones permite contar con información financiera ordenada y al día, sin necesidad de ampliar la estructura interna de la empresa.',
    items: [
      'Outsourcing contable: preparación de informes financieros periódicos, balances y estados de resultados',
      'Supervisión contable',
      'Gerenciamiento externo en materia de estados financieros',
      'Outsourcing de servicios de recursos humanos y remuneraciones',
    ],
    image: '/img/auditorias-financieras.jpg',
    imageAlt: 'Outsourcing contable y de remuneraciones',
    imageWidth: 645,
    imageHeight: 800,
    heroImage: '/img/bg-title-3.webp',
  },
];
