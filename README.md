# ATLC - Sitio Web en Astro

Sitio web profesional para **ATLC — Consultorías & Auditorías**, empresa especializada en consultoría tributaria y auditoría financiera en Chile.

## 🚀 Estructura del Proyecto

```
/
├── public/
│   ├── favicon.png
│   ├── contact.php          # Procesador del formulario de contacto
│   ├── logo-ATLC.png
│   ├── video/
│   │   └── environment.mp4
│   └── img/
│       ├── about-back.jpg
│       ├── Auditorias-Financieras2.jpg
│       └── Oscar-Gajardo-V.jpg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PageHero.astro
│   │   └── TeamCard.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── equipo.astro
│   │   ├── servicios.astro
│   │   ├── blog/
│   │   │   └── index.astro
│   │   └── contacto.astro
│   └── styles/
│       └── global.css
└── package.json
```

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o pnpm

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 📁 Archivos Multimedia Requeridos

Debes colocar los siguientes archivos en la carpeta `public/`:

### Imágenes
- `public/logo-ATLC.png` - Logo de la empresa
- `public/favicon.png` - Favicon del sitio
- `public/img/about-back.jpg` - Imagen para Consultoría Tributaria
- `public/img/Auditorias-Financieras2.jpg` - Imagen para Auditoría
- `public/img/Oscar-Gajardo-V.jpg` - Foto del CEO

### Video
- `public/video/environment.mp4` - Video de fondo para el hero

## 📧 Configuración del Formulario de Contacto

El formulario usa PHP nativo (`public/contact.php`). 

### ⚠️ Importante - Email de Prueba

El archivo `contact.php` está configurado con **`codigoraul@gmail.com`** como destinatario para pruebas en desarrollo.

**Antes de subir a producción**, edita `public/contact.php` y cambia:

```php
$destinatario = 'codigoraul@gmail.com';
```

Por:

```php
$destinatario = 'contacto@atlc.cl';
```

### Requisitos del Hosting

- PHP habilitado (función `mail()`)
- La mayoría de hostings compartidos en Chile lo tienen (Hosting.cl, Webempresa, etc.)
- Configurar SPF/DKIM en el dominio para evitar spam

### Testing Local

El PHP **NO funcionará** con `npm run dev`. Para testear:
- Usar MAMP, XAMPP o servidor PHP local
- O probar directamente en el hosting

## 🎨 Paleta de Colores

```css
--color-primary:    #1B60AD  /* Azul principal */
--color-secondary:  #414656  /* Gris oscuro */
--color-light:      #F1F1F1  /* Gris claro */
--color-dark:       #142c4b  /* Azul oscuro */
--color-footer-bg:  #1a2233  /* Azul marino footer */
```

## 📱 Características

- ✅ Diseño responsive (mobile-first)
- ✅ Navegación sticky con efecto scroll
- ✅ Animaciones con Intersection Observer
- ✅ Formulario de contacto funcional con PHP
- ✅ Hero con video de fondo
- ✅ SEO optimizado
- ✅ Google Fonts (Poppins, Roboto)
- ✅ Mapa de Google Maps integrado

## 🌐 Páginas

- **/** - Inicio (con hero de video y secciones de servicios)
- **/equipo/** - Equipo profesional
- **/servicios/** - Detalle de servicios
- **/blog/** - Blog (preparado para contenido futuro)
- **/contacto/** - Formulario de contacto y datos

## 🔗 Integración WordPress Headless (Opcional)

Para integrar WordPress como CMS headless:

1. Instalar plugin **WPGraphQL** en WordPress
2. Instalar en Astro:
```bash
npm install @apollo/client graphql
```

3. Crear cliente GraphQL en `src/lib/wordpress.js`:
```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://tu-wordpress.com/graphql',
  cache: new InMemoryCache(),
});
```

4. Consultar posts en páginas Astro:
```astro
---
import { client } from '../lib/wordpress';
import { gql } from '@apollo/client';

const { data } = await client.query({
  query: gql`
    query GetPosts {
      posts {
        nodes {
          id
          title
          excerpt
          slug
          date
        }
      }
    }
  `
});

const posts = data.posts.nodes;
---
```

## 📦 Deploy

El sitio es completamente estático y puede desplegarse en:

- Netlify
- Vercel
- GitHub Pages
- Cualquier hosting con soporte para archivos estáticos + PHP

### Deploy en Netlify/Vercel

```bash
npm run build
# La carpeta dist/ contiene el sitio compilado
```

**Nota**: El archivo `contact.php` debe estar en un servidor con PHP. Para Netlify/Vercel, considera usar Netlify Forms o un servicio de email como SendGrid.

## 📄 Licencia

© 2025 ATLC - Todos los derechos reservados
