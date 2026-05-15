#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
BACKUP_DIR="${BACKUP_DIR:-${APP_DIR}/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
TARGET_DIR="${BACKUP_DIR}/${STAMP}"

mkdir -p "${TARGET_DIR}"

echo "==> Creando backup en ${TARGET_DIR}"

if [[ -f "${APP_DIR}/data/apadac.db" ]]; then
  cp "${APP_DIR}/data/apadac.db" "${TARGET_DIR}/apadac.db"
else
  echo "No se encontró data/apadac.db"
  exit 1
fi

if [[ -d "${APP_DIR}/media" ]]; then
  tar -czf "${TARGET_DIR}/media.tar.gz" -C "${APP_DIR}" media
else
  echo "No se encontró la carpeta media/"
  exit 1
fi

if [[ -f "${APP_DIR}/.env.local" ]]; then
  cp "${APP_DIR}/.env.local" "${TARGET_DIR}/.env.local"
fi

find "${BACKUP_DIR}" -mindepth 1 -maxdepth 1 -type d -mtime +"${RETENTION_DAYS}" -exec rm -rf {} +

echo "Backup completado."

