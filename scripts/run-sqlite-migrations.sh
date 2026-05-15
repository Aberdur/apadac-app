#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DB_PATH="${DB_PATH:-${APP_DIR}/data/apadac.db}"
MIGRATIONS_DIR="${MIGRATIONS_DIR:-${APP_DIR}/migrations/sqlite}"

if ! command -v sqlite3 >/dev/null 2>&1; then
  echo "sqlite3 no está instalado."
  exit 1
fi

if [[ ! -f "${DB_PATH}" ]]; then
  echo "No existe la base de datos en ${DB_PATH}"
  exit 1
fi

if [[ ! -d "${MIGRATIONS_DIR}" ]]; then
  echo "No existe el directorio de migraciones ${MIGRATIONS_DIR}"
  exit 1
fi

sqlite3 "${DB_PATH}" <<'SQL'
CREATE TABLE IF NOT EXISTS _app_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
SQL

shopt -s nullglob

for migration in "${MIGRATIONS_DIR}"/*.sql; do
  name="$(basename "${migration}")"
  already_applied="$(sqlite3 "${DB_PATH}" "SELECT 1 FROM _app_migrations WHERE name = '${name}' LIMIT 1;")"

  if [[ "${already_applied}" == "1" ]]; then
    echo "==> Saltando migración ya aplicada: ${name}"
    continue
  fi

  if [[ "${name}" == "2026-05-02_add_donation_funnel_images.sql" ]]; then
    has_button_column="$(
      sqlite3 "${DB_PATH}" "SELECT 1 FROM pragma_table_info('como_ayudar') WHERE name = 'donation_funnel_button_image_id' LIMIT 1;"
    )"
    has_panel_column="$(
      sqlite3 "${DB_PATH}" "SELECT 1 FROM pragma_table_info('como_ayudar') WHERE name = 'donation_funnel_panel_image_id' LIMIT 1;"
    )"

    if [[ "${has_button_column}" != "1" ]]; then
      sqlite3 "${DB_PATH}" "ALTER TABLE como_ayudar ADD COLUMN donation_funnel_button_image_id integer;"
    fi

    if [[ "${has_panel_column}" != "1" ]]; then
      sqlite3 "${DB_PATH}" "ALTER TABLE como_ayudar ADD COLUMN donation_funnel_panel_image_id integer;"
    fi

    sqlite3 "${DB_PATH}" "INSERT INTO _app_migrations (name) VALUES ('${name}');"
    echo "==> Migración conciliada y marcada como aplicada: ${name}"
    continue
  fi

  echo "==> Aplicando migración: ${name}"
  sqlite3 "${DB_PATH}" < "${migration}"
  sqlite3 "${DB_PATH}" "INSERT INTO _app_migrations (name) VALUES ('${name}');"
done

echo "Migraciones SQLite completadas."
