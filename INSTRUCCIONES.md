# 📋 Instrucciones de Configuración - ATLC Website

## 🎯 Pasos Siguientes

### 1. ✅ Colocar Archivos Multimedia

Debes agregar los siguientes archivos en las carpetas correspondientes:

#### Logo y Favicon
- ✅ `public/logo-ATLC.png` - **YA ESTÁ COLOCADO**
- ⚠️ `public/favicon.png` - **REEMPLAZAR** con el favicon real (actualmente es un archivo vacío)

#### Imágenes de Servicios
Colocar en `public/img/`:
- ⚠️ `about-back.jpg` - Imagen para la sección de Consultoría Tributaria
- ⚠️ `Auditorias-Financieras2.jpg` - Imagen para la sección de Auditoría
- ⚠️ `Oscar-Gajardo-V.jpg` - Foto del CEO para la página de Equipo

#### Video Hero
Colocar en `public/video/`:
- ⚠️ `environment.mp4` - Video de fondo para el hero de la página de inicio

### 2. 🔧 Configurar Email del Formulario

Editar `public/contact.php` línea 5:

```php
// CAMBIAR ESTO ANTES DE SUBIR A PRODUCCIÓN:
$destinatario = 'codigoraul@gmail.com';  // ← Email de prueba

// POR ESTO:
$destinatario = 'contacto@atlc.cl';  // ← Email real de ATLC
```

### 3. 🚀 Iniciar el Proyecto

```bash
# Ya instalado, solo ejecutar:
npm run dev
```

El sitio estará disponible en: `http://localhost:4321`

### 4. 🌐 Verificar Páginas

Visitar y verificar cada página:
- ✅ http://localhost:4321/ - Inicio
- ✅ http://localhost:4321/equipo/ - Equipo
- ✅ http://localhost:4321/servicios/ - Servicios
- ✅ http://localhost:4321/blog/ - Blog
- ✅ http://localhost:4321/contacto/ - Contacto

### 5. 📧 Probar Formulario de Contacto

**IMPORTANTE**: El formulario PHP **NO funcionará** con `npm run dev` porque Astro no ejecuta PHP.

Para probar el formulario:

#### Opción A: Usar MAMP/XAMPP
1. Instalar MAMP o XAMPP
2. Ejecutar `npm run build`
3. Copiar la carpeta `dist/` a la carpeta de MAMP/XAMPP
4. Copiar `public/contact.php` a la raíz del servidor
5. Visitar http://localhost:8888/contacto/ (o el puerto de MAMP)

#### Opción B: Probar directamente en el hosting
1. Subir el sitio al hosting
2. Probar el formulario en producción

### 6. 🎨 Personalizar Contenido

#### Agregar más miembros al equipo
Editar `src/pages/equipo.astro` línea 7:

```typescript
const team = [
  { 
    name: "Oscar Andrés Gajardo V.", 
    role: "CEO - Socio", 
    image: "/img/Oscar-Gajardo-V.jpg" 
  },
  // Agregar más miembros aquí:
  {
    name: "Nombre Apellido",
    role: "Cargo",
    image: "/img/foto.jpg"
  },
];
```

#### Modificar servicios en el footer
Editar `src/components/Footer.astro` líneas 18-25

#### Cambiar colores
Editar `src/styles/global.css` líneas 3-11

### 7. 📦 Build para Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio compilado.

**IMPORTANTE**: Copiar manualmente `public/contact.php` a la raíz del servidor de producción.

### 8. 🌍 Deploy

#### Hosting Tradicional (con PHP)
1. Subir contenido de `dist/` al servidor
2. Copiar `public/contact.php` a la raíz
3. Verificar que PHP esté habilitado
4. Configurar dominio: https://atlc.cl

#### Netlify/Vercel (sin PHP)
El formulario PHP no funcionará. Opciones:

**Opción A**: Usar Netlify Forms
Editar `src/pages/contacto.astro`:
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- resto del formulario -->
</form>
```

**Opción B**: Usar servicio externo (SendGrid, EmailJS, etc.)

### 9. 🔗 WordPress Headless (Opcional)

Si quieres usar WordPress como CMS para el blog:

1. Leer `WORDPRESS-HEADLESS.md`
2. Instalar WPGraphQL en WordPress
3. Instalar dependencias:
```bash
npm install @apollo/client graphql
```
4. Seguir las instrucciones del documento

## ✅ Checklist Pre-Producción

- [ ] Todas las imágenes colocadas en `public/img/`
- [ ] Video colocado en `public/video/`
- [ ] Favicon real en `public/favicon.png`
- [ ] Email cambiado a `contacto@atlc.cl` en `contact.php`
- [ ] Sitio probado en desarrollo (`npm run dev`)
- [ ] Formulario probado (en MAMP o hosting)
- [ ] Build ejecutado sin errores (`npm run build`)
- [ ] Contenido de `dist/` subido al servidor
- [ ] `contact.php` copiado a la raíz del servidor
- [ ] Dominio configurado correctamente
- [ ] SSL/HTTPS habilitado
- [ ] Google Maps funcionando
- [ ] Todas las páginas accesibles
- [ ] Responsive verificado en mobile

## 🆘 Problemas Comunes

### El video no se reproduce
- Verificar que `environment.mp4` esté en `public/video/`
- Verificar formato del video (MP4 H.264)
- Probar con un video más liviano

### Imágenes no aparecen
- Verificar rutas (deben estar en `public/img/`)
- Verificar nombres de archivo (case-sensitive)
- Verificar extensiones (.jpg, .png)

### Formulario no envía emails
- Verificar que PHP esté habilitado en el servidor
- Verificar función `mail()` disponible
- Configurar SPF/DKIM en el dominio
- Revisar logs del servidor

### Header no es sticky
- Verificar que el JavaScript del Layout.astro se esté ejecutando
- Abrir consola del navegador para ver errores

### Animaciones no funcionan
- Verificar que Intersection Observer esté soportado
- Probar en navegador moderno (Chrome, Firefox, Safari)

## 📞 Soporte

Para dudas o problemas:
- Revisar documentación de Astro: https://docs.astro.build/
- Revisar README.md del proyecto
- Revisar WORDPRESS-HEADLESS.md para integración con WordPress

## 🎉 ¡Listo!

Una vez completados todos los pasos, el sitio estará listo para producción.
