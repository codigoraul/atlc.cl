export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export interface Post {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  date: string; // ISO: YYYY-MM-DD
  author: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'compliance-tributario-que-es-y-por-que-implementarlo',
    title: 'Compliance tributario: qué es y por qué tu empresa debería implementarlo',
    seoTitle: 'Compliance tributario: qué es y por qué implementarlo en tu empresa | ATLC',
    excerpt:
      'El cumplimiento tributario no se trata solo de pagar a tiempo. Te explicamos qué es el compliance tributario y cómo ayuda a reducir contingencias frente al SII.',
    date: '2026-11-07',
    author: 'Equipo ATLC',
    image: '/img/consultoria-tributaria.jpg',
    imageWidth: 613,
    imageHeight: 802,
    body: [
      {
        type: 'p',
        text: 'Cumplir con las obligaciones tributarias es una responsabilidad permanente de toda empresa. Sin embargo, hacerlo de forma reactiva, mes a mes y sin un orden definido, suele terminar en errores, multas y revisiones que consumen tiempo y recursos. El compliance tributario propone el camino contrario: organizar el cumplimiento de manera preventiva.',
      },
      { type: 'h2', text: '¿Qué es el compliance tributario?' },
      {
        type: 'p',
        text: 'Es el conjunto de políticas, procesos y controles que una organización establece para asegurar que cumple correctamente con sus obligaciones ante el Servicio de Impuestos Internos (SII) y con la normativa tributaria que le aplica. Incluye desde la preparación de declaraciones periódicas hasta la documentación que respalda cada operación relevante.',
      },
      { type: 'h2', text: 'Por qué importa para una empresa' },
      {
        type: 'ul',
        items: [
          'Reduce el riesgo de errores en declaraciones y, con ello, de multas, intereses y reparos.',
          'Ordena la información contable y tributaria, lo que facilita responder con rapidez ante una fiscalización.',
          'Da visibilidad a la administración sobre los impactos tributarios de las decisiones de negocio antes de ejecutarlas.',
          'Permite aprovechar los beneficios tributarios que corresponden a la industria y a la estructura de cada cliente.',
        ],
      },
      { type: 'h2', text: 'Elementos básicos de un buen programa de cumplimiento' },
      {
        type: 'ul',
        items: [
          'Un calendario de obligaciones, con responsables claros para cada declaración y pago.',
          'Procesos de revisión de la información contable antes de presentarla.',
          'Respaldo documental ordenado de las operaciones: contratos, facturas y conciliaciones.',
          'Seguimiento de los cambios normativos que afectan al giro de la empresa.',
          'Revisión periódica con un asesor, para detectar contingencias antes de que lo haga la autoridad.',
        ],
      },
      { type: 'h2', text: 'Cuándo conviene apoyarse en un asesor externo' },
      {
        type: 'p',
        text: 'Muchas pymes y empresas familiares no cuentan con un equipo tributario propio. En esos casos, una consultoría permanente permite contar con criterio especializado a lo largo del año, no solo en el momento de la declaración anual. También es especialmente útil ante reorganizaciones empresariales, incorporación de nuevos negocios o inversiones nacionales y extranjeras.',
      },
      { type: 'h2', text: 'Conclusión' },
      {
        type: 'p',
        text: 'El compliance tributario es una inversión en tranquilidad y en previsibilidad. Si quieres evaluar cómo se encuentra hoy el cumplimiento de tu empresa o tu patrimonio familiar, nuestro equipo puede ayudarte a hacer un diagnóstico y definir los siguientes pasos.',
      },
    ],
  },
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d} de ${meses[m - 1]} de ${y}`;
}
