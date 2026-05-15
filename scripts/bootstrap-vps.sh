#!/usr/bin/env bash

set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Este script debe ejecutarse con sudo o como root."
  exit 1
fi

APP_USER="${SUDO_USER:-root}"

echo "==> Actualizando paquetes"
apt update
apt upgrade -y

echo "==> Instalando dependencias base"
apt install -y curl git nginx ca-certificates sqlite3

if ! command -v node >/dev/null 2>&1; then
  echo "==> Instalando Node.js 20"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
else
  echo "==> Node.js ya está instalado: $(node -v)"
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Instalando pm2 global"
  npm install -g pm2
else
  echo "==> pm2 ya está instalado: $(pm2 -v)"
fi

echo "==> Preparando carpeta de despliegue"
mkdir -p /var/www/apadac
chown -R "${APP_USER}:${APP_USER}" /var/www/apadac

echo
echo "Bootstrap completado."
echo "Siguiente paso recomendado:"
echo "1. Clonar el repo en /var/www/apadac"
echo "2. Copiar .env.local, data/apadac.db y media/"
echo "3. Ejecutar scripts/deploy-app.sh como usuario normal"
