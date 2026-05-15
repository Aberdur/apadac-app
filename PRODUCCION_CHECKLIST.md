# Checklist De Salida A Producción

## 1. Entorno

- `Node.js 20` instalado en la VPS
- `nginx` instalado
- `pm2` instalado
- `sqlite3` instalado
- usuario de despliegue sin usar `root`
- firewall activo
- puertos `80` y `443` abiertos
- puerto `3000` accesible solo en `127.0.0.1`

## 2. Variables de entorno

- `.env.local` creado a partir de [`.env.production.example`](./.env.production.example)
- `PAYLOAD_SECRET` definitivo y fuerte
- `NEXT_PUBLIC_SERVER_URL` configurado con el dominio final `https://...`
- `PAYLOAD_PUBLIC_SERVER_URL` configurado con el dominio final `https://...`
- SMTP final configurado y validado

## 3. Datos

- `data/apadac.db` copiado en la VPS
- `media/` copiado en la VPS
- backup previo al despliegue realizado
- restauración de prueba documentada

## 4. Migraciones

- ejecutar [`scripts/run-sqlite-migrations.sh`](./scripts/run-sqlite-migrations.sh)
- comprobar tabla `_app_migrations`
- verificar que no quedan cambios manuales pendientes en esquema

## 5. Build y proceso

- `npm ci`
- `npm run build`
- `pm2 restart apadac --update-env` o arranque inicial
- `pm2 save`
- `pm2 startup` configurado

## 6. Reverse proxy y SSL

- configuración de nginx aplicada desde [`deploy/nginx/apadac.conf.example`](./deploy/nginx/apadac.conf.example)
- `nginx -t` correcto
- `certbot` emitido para dominio y `www`
- redirección `http -> https` activa

## 7. Backups automáticos

- [`scripts/backup-app.sh`](./scripts/backup-app.sh) probado manualmente
- tarea automática diaria configurada
- retención configurada
- copia externa planificada si es posible

## 8. Smoke test funcional

- `/` carga correctamente
- `/adopta` carga correctamente
- `/como-ayudar` carga correctamente
- `/admin` abre y permite login
- selector de idioma funciona
- formulario de adopción envía
- cuestionario preadopción envía
- subida de imágenes desde admin funciona
- recuperación de contraseña funciona si se va a usar
- emails no llegan a spam en pruebas reales

## 9. Post-despliegue

- logs de `pm2` sin errores críticos
- uso de disco verificado
- backup confirmado tras el primer despliegue
- credenciales de prueba eliminadas del servidor final

