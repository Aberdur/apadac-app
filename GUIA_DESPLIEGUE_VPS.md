# Guía De Despliegue En VPS

Esta guía está pensada para publicar APADAC en un `VPS Ubuntu/Debian` usando:

- `Node.js 20`
- `pm2`
- `nginx`
- `SQLite`
- repositorio público en `GitHub`

La app queda servida por `Next.js` en el puerto `3000` y `nginx` actúa como proxy inverso con dominio y HTTPS.

Archivos de apoyo incluidos en el repo:

- plantilla de entorno: [`.env.production.example`](./.env.production.example)
- nginx de referencia: [`deploy/nginx/apadac.conf.example`](./deploy/nginx/apadac.conf.example)
- migraciones SQLite: [`scripts/run-sqlite-migrations.sh`](./scripts/run-sqlite-migrations.sh)
- backup local: [`scripts/backup-app.sh`](./scripts/backup-app.sh)
- checklist final: [`PRODUCCION_CHECKLIST.md`](./PRODUCCION_CHECKLIST.md)

## 1. Qué necesitas antes de empezar

- un `VPS` operativo con acceso `ssh`
- un dominio o subdominio de testing
  - ejemplo: `test.apadac.org`
- copia de estos dos elementos de la máquina local:
  - `data/apadac.db`
  - `media/`
- credenciales SMTP si quieres que funcionen los formularios de adopción

## 2. Entrar al VPS y actualizar paquetes

```bash
ssh usuario@IP_DEL_VPS
sudo apt update
sudo apt upgrade -y
```

## 3. Instalar Node.js 20, nginx y utilidades

Puedes hacerlo a mano o usar el script incluido en el repo.

### Opción rápida

Cuando ya tengas el repo en el VPS:

```bash
sudo bash scripts/bootstrap-vps.sh
```

### Opción manual

```bash
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Comprueba versiones:

```bash
node -v
npm -v
pm2 -v
```

## 4. Clonar el repositorio

### Opción A. Con clave SSH

En el VPS:

```bash
ssh-keygen -t ed25519 -C "apadac-vps"
cat ~/.ssh/id_ed25519.pub
```

Copia la clave pública y añádela en GitHub:

- `GitHub > Settings > SSH and GPG keys`
- o como `Deploy key` del repositorio

Después:

```bash
cd /var/www
sudo mkdir -p /var/www/apadac
sudo chown -R $USER:$USER /var/www/apadac
git clone git@github.com:Aberdur/apadac-app.git /var/www/apadac
cd /var/www/apadac
```

### Opción B. Con HTTPS

Si prefieres usar HTTPS:

```bash
git clone https://github.com/Aberdur/apadac-app.git /var/www/apadac
cd /var/www/apadac
```

## 5. Instalar dependencias

```bash
cd /var/www/apadac
npm install
```

## 6. Crear `.env.local`

En `/var/www/apadac/.env.local`:

```env
PAYLOAD_SECRET=pon_aqui_un_secreto_largo_y_privado
DATABASE_URL=file:./data/apadac.db

SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=usuario-smtp
SMTP_PASS=password-smtp
SMTP_FROM_EMAIL=no-reply@tu-dominio.com
SMTP_FROM_NAME=APADAC

NEXT_PUBLIC_SERVER_URL=https://test.tu-dominio.com
PAYLOAD_PUBLIC_SERVER_URL=https://test.tu-dominio.com
```

Notas:

- `NEXT_PUBLIC_SERVER_URL` y `PAYLOAD_PUBLIC_SERVER_URL` deben apuntar al dominio final.
- si usas Gmail para pruebas:
  - `SMTP_HOST=smtp.gmail.com`
  - `SMTP_PORT=465`
  - `SMTP_SECURE=true`
  - `SMTP_USER=tu_gmail`
  - `SMTP_PASS=tu_app_password`

En producción conviene partir de [`.env.production.example`](./.env.production.example).

## 7. Copiar base de datos e imágenes

Desde tu máquina local, copia:

- `data/apadac.db`
- `media/`

Ejemplo con `scp`:

```bash
scp /ruta/local/apadac/data/apadac.db usuario@IP_DEL_VPS:/var/www/apadac/data/apadac.db
scp -r /ruta/local/apadac/media usuario@IP_DEL_VPS:/var/www/apadac/media
```

Después, en el VPS:

```bash
cd /var/www/apadac
mkdir -p data media
ls data
ls media
```

## 8. Migraciones y build

Antes del build, aplica migraciones SQLite:

```bash
cd /var/www/apadac
bash scripts/run-sqlite-migrations.sh
```

Después construye la aplicación:

### Opción rápida

```bash
cd /var/www/apadac
bash scripts/deploy-app.sh
```

Este script:

- comprueba `.env.local`
- comprueba `data/apadac.db`
- comprueba `media/`
- ejecuta `npm ci`
- ejecuta migraciones SQLite
- ejecuta `npm run build`
- crea o reinicia el proceso `pm2`

### Opción manual

```bash
cd /var/www/apadac
npm run build
```

## 9. Levantar la app con pm2

```bash
cd /var/www/apadac
pm2 start npm --name apadac -- start
pm2 save
pm2 startup
```

Comprueba que está viva:

```bash
pm2 status
curl http://127.0.0.1:3000
```

## 10. Configurar nginx

Crea un archivo:

```bash
sudo nano /etc/nginx/sites-available/apadac
```

Contenido base:

```nginx
# usa directamente deploy/nginx/apadac.conf.example
```

Activar:

```bash
sudo ln -s /etc/nginx/sites-available/apadac /etc/nginx/sites-enabled/apadac
sudo nginx -t
sudo systemctl reload nginx
```

## 11. Configurar DNS

En el panel del dominio crea un registro `A`:

- nombre: `test` o el subdominio que quieras
- valor: la IP pública del VPS

Espera a que propague y prueba:

```text
http://test.tu-dominio.com
```

## 12. Activar HTTPS con Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d test.tu-dominio.com
```

Comprueba renovación:

```bash
sudo certbot renew --dry-run
```

## 13. Backups

Haz una prueba manual:

```bash
cd /var/www/apadac
bash scripts/backup-app.sh
```

Programa una tarea diaria con `crontab -e`, por ejemplo:

```cron
15 3 * * * cd /var/www/apadac && /bin/bash scripts/backup-app.sh >> /var/log/apadac-backup.log 2>&1
```

## 14. Validación final

Antes de abrir el dominio al público, sigue [`PRODUCCION_CHECKLIST.md`](./PRODUCCION_CHECKLIST.md).

## 13. Checklist de primera publicación

Antes de dar por buena la `v1.0` de testing:

1. abre la home pública
2. entra en `/admin`
3. inicia sesión
4. crea o edita un animal
5. sube una imagen
6. crea un anuncio
7. prueba el formulario de adopción
8. comprueba que el correo llega
9. revisa la versión móvil

## 14. Actualizar la web en el VPS

Cuando hagáis nuevos commits:

### Opción rápida

```bash
cd /var/www/apadac
git pull
bash scripts/deploy-app.sh
```

### Opción manual

```bash
cd /var/www/apadac
git pull
npm install
npm run build
pm2 restart apadac
```

Si habéis cambiado solo frontend normalmente bastará. Si añadís nuevos campos de `SQLite`, recuerda copiar también la base actualizada o aplicar los cambios manuales necesarios.

## 15. Copias de seguridad mínimas

Este proyecto depende de dos elementos críticos:

- `data/apadac.db`
- `media/`

Haz backup frecuente de ambos. Ejemplo rápido:

```bash
tar -czf /var/backups/apadac-media-$(date +%F).tar.gz /var/www/apadac/media
cp /var/www/apadac/data/apadac.db /var/backups/apadac-$(date +%F).db
```

## 16. Limitación actual importante

La app no usa todavía migraciones versionadas. Eso significa:

- el contenido no vive solo en Git
- la base SQLite forma parte del estado real de la instalación
- si cambias el esquema en local, tendrás que replicarlo con cuidado en el VPS

Mientras no haya migraciones, la forma segura de mantener staging o producción es tratar `data/apadac.db` y `media/` como parte del despliegue.
