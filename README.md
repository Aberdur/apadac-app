# APADAC

Nueva web de APADAC construida con `Next.js`, `TypeScript`, `Tailwind CSS`, `Payload CMS` y `SQLite`.

## Qué incluye

- web pública con home, adopciones, casos de éxito, apadrinamiento y cómo ayudar
- panel de gestión en `/admin`
- colección `animals` para fichas de perros y gatos
- colección `media` para imágenes
- usuarios con permisos básicos
- selector de idioma en español, inglés y alemán

## Requisitos

- `Node.js 20` o superior
- `npm`

## Instalación en otra máquina

### 1. Clonar el repositorio

Con `SSH`:

```bash
git clone git@github.com:Aberdur/apadac-app.git
cd apadac-app
```

Con `HTTPS`:

```bash
git clone https://github.com/Aberdur/apadac-app.git
cd apadac-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
PAYLOAD_SECRET=tu-secreto-local
DATABASE_URL=file:./data/apadac.db
SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=usuario-smtp
SMTP_PASS=tu-password-smtp
SMTP_FROM_EMAIL=no-reply@tu-dominio.com
SMTP_FROM_NAME=APADAC
```

Notas:

- `PAYLOAD_SECRET` puede ser cualquier valor largo y privado.
- `DATABASE_URL` apunta a la base SQLite local.
- `SMTP_*` permite enviar por email las solicitudes de adopción desde la web.
- El destinatario del correo será el `Email de contacto` de la ficha del animal y, si no existe, el email configurado en `Cómo ayudar`.

### 4. Copiar la base de datos y los archivos subidos

Esto es importante.

El código del proyecto está en GitHub, pero el contenido editable no:

- la base de datos local `data/apadac.db`
- las imágenes subidas en la carpeta `media/`
- el archivo local `.env.local`

Si quieres que la nueva máquina vea exactamente los mismos animales, usuarios, textos e imágenes que la máquina actual, copia:

```text
data/apadac.db
media/
```

desde la máquina original a la nueva.

Estructura esperada:

```text
apadac/
  data/
    apadac.db
  media/
    ...
```

### 5. Arrancar en desarrollo

```bash
npm run dev
```

Este script usa `Webpack` por defecto para evitar problemas del admin de Payload con `Turbopack`.

Después abre:

- `http://localhost:3000/`
- `http://localhost:3000/adopta`
- `http://localhost:3000/admin`

## Cómo probarla desde el móvil

1. Arranca el servidor escuchando en red local:

```bash
npm run dev:network
```

2. Averigua la IP local del ordenador:

```bash
ipconfig getifaddr en0
```

Si no devuelve nada:

```bash
ipconfig getifaddr en1
```

3. Desde el móvil, en la misma Wi‑Fi, abre:

```text
http://TU_IP_LOCAL:3000
```

Ejemplo:

```text
http://192.168.1.34:3000
```

## Arranque en producción

```bash
npm run build
npm start
```

El build también usa `Webpack` por estabilidad con el panel de administración.

Por defecto quedará en:

- `http://localhost:3000/`

Si quieres probar también la versión de producción desde el móvil:

```bash
npm run start:network
```

Y abre:

```text
http://TU_IP_LOCAL:3000
```

## Scripts útiles

```bash
npm run dev
npm run dev:network
npm run dev:turbo
npm run build
npm start
npm run start:network
npm run lint
npx tsc --noEmit
npm run payload:types
npm run payload:importmap
```

`npm run dev:turbo` queda disponible solo para pruebas; no es la opción recomendada para este proyecto.

## Estado actual de instalación

Ahora mismo el proyecto está pensado para copiarse entre máquinas junto con su base SQLite y su carpeta `media`.

Todavía no hay un sistema de migraciones versionadas para levantar una instalación completamente vacía desde cero sin copiar `data/apadac.db`.

Si quieres, el siguiente paso técnico recomendable es preparar:

1. migraciones de base de datos
2. un primer setup limpio para instalar desde cero
3. una guía de despliegue en servidor

## Documentación del proyecto

- estrategia y arquitectura: [PLAN_REESTRUCTURACION.md](./PLAN_REESTRUCTURACION.md)
- despliegue en VPS: [GUIA_DESPLIEGUE_VPS.md](./GUIA_DESPLIEGUE_VPS.md)
- checklist de producción: [PRODUCCION_CHECKLIST.md](./PRODUCCION_CHECKLIST.md)

## Scripts de despliegue

Dentro del repo hay dos scripts útiles para VPS Ubuntu/Debian:

- [bootstrap-vps.sh](./scripts/bootstrap-vps.sh)
  - instala `git`, `nginx`, `Node.js 20` y `pm2`
  - prepara `/var/www/apadac`
- [deploy-app.sh](./scripts/deploy-app.sh)
  - valida `.env.local`, `data/apadac.db` y `media/`
  - ejecuta migraciones SQLite
  - ejecuta `npm ci`
  - ejecuta `npm run build`
  - crea o reinicia la app en `pm2`
- [run-sqlite-migrations.sh](./scripts/run-sqlite-migrations.sh)
  - aplica las migraciones SQL pendientes sobre `data/apadac.db`
- [backup-app.sh](./scripts/backup-app.sh)
  - genera un backup local de base de datos, `media/` y `.env.local`

Ejemplos:

```bash
sudo bash scripts/bootstrap-vps.sh
bash scripts/deploy-app.sh
```
