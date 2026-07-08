'use client';

import { useField } from '@payloadcms/ui';
import React from 'react';

export const DateStringField = ({ path, label, required }: { path: string; label: string; required?: boolean }) => {
  const { value, setValue } = useField<string>({ path });

  let inputDate = '';
  if (typeof value === 'string' && value.includes('/')) {
    const [day, month, year] = value.split('/');
    if (year && month && day) {
      inputDate = `${year}-${month}-${day}`;
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--theme-elevation-500, #999)' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => {
          const val = e.target.value;
          if (val) {
            const [y, m, d] = val.split('-');
            setValue(`${d}/${m}/${y}`);
          } else {
            setValue('');
          }
        }}
        style={{
          width: '100%',
          padding: '10px 15px',
          border: '1px solid var(--theme-elevation-200, #444)',
          borderRadius: '4px',
          backgroundColor: 'var(--theme-bg, #222)',
          color: 'var(--theme-elevation-800, #fff)',
          fontFamily: 'inherit',
        }}
      />
      {typeof value === 'string' && value !== '' && !value.includes('/') && (
        <p style={{ color: '#e89b00', fontSize: '12px', marginTop: '6px' }}>
          Valor actual en texto: <strong>{value}</strong> (Usa el calendario para convertirlo a fecha)
        </p>
      )}
    </div>
  );
};
