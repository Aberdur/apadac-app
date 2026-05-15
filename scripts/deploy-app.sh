#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
APP_NAME="${APP_NAME:-apadac}"
PORT="${PORT:-3000}"

cd "${APP_DIR}"

echo "==> Desplegando APADAC desde ${APP_DIR}"

if [[ ! -f ".env.local" ]]; then
  echo "Falta .env.local en la raíz del proyecto."
  exit 1
fi

if [[ ! -f "data/apadac.db" ]]; then
  echo "Falta data/apadac.db."
  exit 1
fi

if [[ ! -d "media" ]]; then
  echo "Falta la carpeta media/."
  exit 1
fi

echo "==> Instalando dependencias"
npm ci

echo "==> Aplicando migraciones SQLite"
bash scripts/run-sqlite-migrations.sh

echo "==> Generando build de producción"
npm run build

if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  echo "==> Reiniciando proceso existente en pm2"
  pm2 restart "${APP_NAME}" --update-env
else
  echo "==> Creando proceso en pm2"
  pm2 start npm --name "${APP_NAME}" -- start -- --hostname 127.0.0.1 --port "${PORT}"
fi

pm2 save

echo
echo "Despliegue completado."
echo "Comprueba el proceso con: pm2 status"
echo "Prueba la app con: curl http://127.0.0.1:${PORT}"
