CREATE TABLE IF NOT EXISTS animal_dossiers (
  id integer PRIMARY KEY NOT NULL,
  animal_id integer NOT NULL,
  general_notes text,
  updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX IF NOT EXISTS animal_dossiers_animal_idx
  ON animal_dossiers (animal_id);

CREATE INDEX IF NOT EXISTS animal_dossiers_updated_at_idx
  ON animal_dossiers (updated_at);

CREATE INDEX IF NOT EXISTS animal_dossiers_created_at_idx
  ON animal_dossiers (created_at);

CREATE TABLE IF NOT EXISTS animal_files (
  id integer PRIMARY KEY NOT NULL,
  dossier_id integer,
  title text,
  updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  url text,
  thumbnail_u_r_l text,
  filename text,
  mime_type text,
  filesize numeric,
  width numeric,
  height numeric,
  focal_x numeric,
  focal_y numeric,
  FOREIGN KEY (dossier_id) REFERENCES animal_dossiers(id) ON UPDATE no action ON DELETE set null
);

CREATE INDEX IF NOT EXISTS animal_files_dossier_idx
  ON animal_files (dossier_id);

CREATE INDEX IF NOT EXISTS animal_files_updated_at_idx
  ON animal_files (updated_at);

CREATE INDEX IF NOT EXISTS animal_files_created_at_idx
  ON animal_files (created_at);

CREATE UNIQUE INDEX IF NOT EXISTS animal_files_filename_idx
  ON animal_files (filename);

CREATE TABLE IF NOT EXISTS animal_dossiers_documents (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  id text PRIMARY KEY NOT NULL,
  title text NOT NULL,
  type text DEFAULT 'veterinario' NOT NULL,
  document_date text,
  summary text,
  notes text,
  FOREIGN KEY (_parent_id) REFERENCES animal_dossiers(id) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS animal_dossiers_documents_order_idx
  ON animal_dossiers_documents (_order);

CREATE INDEX IF NOT EXISTS animal_dossiers_documents_parent_id_idx
  ON animal_dossiers_documents (_parent_id);

CREATE TABLE IF NOT EXISTS animal_dossiers_rels (
  id integer PRIMARY KEY NOT NULL,
  "order" integer,
  parent_id integer NOT NULL,
  path text NOT NULL,
  animal_files_id integer,
  FOREIGN KEY (parent_id) REFERENCES animal_dossiers(id) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (animal_files_id) REFERENCES animal_files(id) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS animal_dossiers_rels_order_idx
  ON animal_dossiers_rels ("order");

CREATE INDEX IF NOT EXISTS animal_dossiers_rels_parent_idx
  ON animal_dossiers_rels (parent_id);

CREATE INDEX IF NOT EXISTS animal_dossiers_rels_path_idx
  ON animal_dossiers_rels (path);

CREATE INDEX IF NOT EXISTS animal_dossiers_rels_animal_files_id_idx
  ON animal_dossiers_rels (animal_files_id);

INSERT OR IGNORE INTO animal_dossiers (animal_id)
SELECT id
FROM animals;

ALTER TABLE payload_locked_documents_rels
  ADD COLUMN animal_files_id integer;

ALTER TABLE payload_locked_documents_rels
  ADD COLUMN animal_dossiers_id integer;

CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_animal_files_id_idx
  ON payload_locked_documents_rels (animal_files_id);

CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_animal_dossiers_id_idx
  ON payload_locked_documents_rels (animal_dossiers_id);
