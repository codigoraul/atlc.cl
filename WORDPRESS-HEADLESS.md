# Integración WordPress Headless con Astro

Esta guía explica cómo integrar WordPress como CMS headless para el sitio ATLC en Astro.

## 📋 Requisitos

- WordPress instalado y configurado
- Acceso al panel de administración de WordPress
- Node.js y npm instalados

## 🔧 Configuración de WordPress

### 1. Instalar WPGraphQL

```bash
# Opción 1: Desde el panel de WordPress
Panel → Plugins → Añadir nuevo → Buscar "WPGraphQL" → Instalar y Activar

# Opción 2: Vía WP-CLI
wp plugin install wp-graphql --activate
```

### 2. Configurar Permalinks

Ir a **Ajustes → Enlaces permanentes** y seleccionar **Nombre de la entrada** o cualquier estructura personalizada (no usar "Simple").

### 3. Habilitar CORS (si WordPress está en otro dominio)

Agregar al `wp-config.php`:

```php
// Habilitar CORS para GraphQL
define('GRAPHQL_CORS_ENABLE', true);
```

O instalar el plugin **WPGraphQL CORS**:

```bash
wp plugin install wp-graphql-cors --activate
```

### 4. Verificar GraphQL

Visitar: `https://tu-wordpress.com/graphql`

Deberías ver el IDE de GraphQL (GraphiQL).

## 📦 Instalación en Astro

```bash
npm install @apollo/client graphql
```

## 🛠️ Implementación

### 1. Crear Cliente GraphQL

Crear archivo `src/lib/wordpress.ts`:

```typescript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://tu-wordpress.com/graphql',
  fetch,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

### 2. Consultar Posts en Blog

Editar `src/pages/blog/index.astro`:

```astro
---
import { client } from '../../lib/wordpress';
import { gql } from '@apollo/client';
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import PageHero from '../../components/PageHero.astro';

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

const { data } = await client.query({ query: GET_POSTS });
const posts = data.posts.nodes;
---

<Layout title="Blog" description="Artículos y novedades sobre tributación y auditoría.">
  <Header />
  <PageHero label="Novedades & Artículos" title="Blog" />

  <section class="blog-section">
    <div class="container">
      {posts.length > 0 ? (
        <div class="blog-grid">
          {posts.map((post) => (
            <article class="blog-card animate-on-scroll">
              {post.featuredImage && (
                <div class="blog-card-image">
                  <img 
                    src={post.featuredImage.node.sourceUrl} 
                    alt={post.featuredImage.node.altText || post.title} 
                  />
                </div>
              )}
              <div class="blog-card-content">
                <time class="blog-card-date">
                  {new Date(post.date).toLocaleDateString('es-CL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h3 class="blog-card-title">{post.title}</h3>
                <div class="blog-card-excerpt" set:html={post.excerpt} />
                <a href={`/blog/${post.slug}/`} class="blog-card-link">Leer más →</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </div>
  </section>

  <Footer />
</Layout>
```

### 3. Crear Página Individual de Post

Crear `src/pages/blog/[slug].astro`:

```astro
---
import { client } from '../../lib/wordpress';
import { gql } from '@apollo/client';
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

export async function getStaticPaths() {
  const GET_ALL_POSTS = gql`
    query GetAllPosts {
      posts(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({ query: GET_ALL_POSTS });
  
  return data.posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }));
}

const { slug } = Astro.params;

const GET_POST = gql`
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const { data } = await client.query({
  query: GET_POST,
  variables: { slug },
});

const post = data.post;

if (!post) {
  return Astro.redirect('/404');
}
---

<Layout title={post.title} description={post.excerpt || post.title}>
  <Header />

  <article class="post-single">
    <div class="container">
      <header class="post-header">
        <h1 class="post-title">{post.title}</h1>
        <div class="post-meta">
          <time>{new Date(post.date).toLocaleDateString('es-CL')}</time>
          <span>Por {post.author.node.name}</span>
        </div>
      </header>

      {post.featuredImage && (
        <div class="post-featured-image">
          <img 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title} 
          />
        </div>
      )}

      <div class="post-content" set:html={post.content} />
    </div>
  </article>

  <Footer />
</Layout>

<style>
  .post-single {
    padding: 80px 0;
  }

  .post-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .post-title {
    font-size: clamp(2rem, 4vw, 3rem);
    color: #142c4b;
    margin-bottom: 1rem;
  }

  .post-meta {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    color: #414656;
    font-size: 0.95rem;
  }

  .post-featured-image {
    margin-bottom: 3rem;
    border-radius: 8px;
    overflow: hidden;
  }

  .post-featured-image img {
    width: 100%;
    height: auto;
  }

  .post-content {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.05rem;
    line-height: 1.8;
    color: #414656;
  }

  .post-content :global(h2) {
    font-size: 1.8rem;
    color: #142c4b;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .post-content :global(h3) {
    font-size: 1.4rem;
    color: #142c4b;
    margin-top: 2rem;
    margin-bottom: 0.8rem;
  }

  .post-content :global(p) {
    margin-bottom: 1.5rem;
  }

  .post-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 2rem 0;
  }

  .post-content :global(a) {
    color: #1B60AD;
    text-decoration: underline;
  }

  .post-content :global(a:hover) {
    color: #142c4b;
  }
</style>
```

## 🎨 Campos Personalizados (ACF)

Si usas **Advanced Custom Fields** en WordPress:

### 1. Instalar Plugin ACF para GraphQL

```bash
wp plugin install wp-graphql-acf --activate
```

### 2. Consultar Campos Personalizados

```graphql
query GetPostWithACF($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    content
    customFields {
      campoPersonalizado1
      campoPersonalizado2
    }
  }
}
```

## 🔄 Regeneración Automática (ISR)

Para regenerar el sitio cuando se publique contenido en WordPress:

### Opción 1: Webhook de Netlify/Vercel

1. En Netlify/Vercel, crear un **Build Hook**
2. Copiar la URL del webhook
3. En WordPress, instalar plugin **WP Webhooks**
4. Configurar webhook para disparar en `post_published`

### Opción 2: Cron Job

Configurar un cron que ejecute:

```bash
# Cada hora
0 * * * * cd /ruta/proyecto && git pull && npm run build
```

## 📝 Variables de Entorno

Crear `.env`:

```env
WORDPRESS_API_URL=https://tu-wordpress.com/graphql
```

Actualizar `src/lib/wordpress.ts`:

```typescript
const httpLink = new HttpLink({
  uri: import.meta.env.WORDPRESS_API_URL || 'https://tu-wordpress.com/graphql',
  fetch,
});
```

## 🔐 Autenticación (Contenido Privado)

Si necesitas acceder a posts privados:

### 1. Crear Token de Aplicación en WordPress

Panel → Usuarios → Tokens de Aplicación

### 2. Configurar Headers

```typescript
const httpLink = new HttpLink({
  uri: 'https://tu-wordpress.com/graphql',
  headers: {
    authorization: `Bearer ${import.meta.env.WORDPRESS_AUTH_TOKEN}`,
  },
  fetch,
});
```

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build con datos de WordPress
npm run build

# Preview
npm run preview
```

## 📚 Recursos

- [WPGraphQL Docs](https://www.wpgraphql.com/)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Astro Docs](https://docs.astro.build/)

## ⚠️ Notas Importantes

1. **Performance**: GraphQL consulta solo los datos necesarios, mejorando el rendimiento
2. **Cache**: Apollo Client cachea automáticamente las consultas
3. **Build Time**: Los posts se generan en tiempo de build (SSG)
4. **Imágenes**: Considera usar un CDN para las imágenes de WordPress
5. **SEO**: Los meta tags se generan desde los datos de WordPress

## 🐛 Troubleshooting

### Error: "Cannot query field"

Verificar que WPGraphQL esté activado y la URL sea correcta.

### Posts no aparecen

Verificar que los posts estén **publicados** (no en borrador).

### CORS Error

Habilitar CORS en WordPress (ver paso 3 de configuración).

### Build muy lento

Limitar la cantidad de posts en desarrollo:

```graphql
posts(first: 10) { ... }
```
