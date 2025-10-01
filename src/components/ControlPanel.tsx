import { useState } from 'react';

interface ControlPanelProps {
  onCreate: (key: string) => void;
}

export default function ControlPanel({ onCreate }: ControlPanelProps) {
  const [key, setKey] = useState('OMEGA-USER-001');

  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: 'rgba(10, 10, 18, 0.85)',
        padding: 16,
        borderRadius: 8,
        border: '1px solid rgba(0, 255, 204, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 255, 204, 0.1)',
        fontFamily: 'monospace',
        color: '#cfe'
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#0ff', fontSize: 14, fontWeight: 600 }}>
        OMEGA Control Panel
      </h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="License Key"
          style={{
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(0, 255, 204, 0.4)',
            borderRadius: 4,
            color: '#0ff',
            fontFamily: 'monospace',
            fontSize: 12,
            outline: 'none',
            minWidth: 180
          }}
        />
        <button
          onClick={() => onCreate(key)}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(255, 51, 255, 0.2))',
            border: '1px solid rgba(255, 51, 255, 0.5)',
            borderRadius: 4,
            color: '#f0f',
            fontFamily: 'monospace',
            fontSize: 12,
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 204, 0.3), rgba(255, 51, 255, 0.3))';
            e.currentTarget.style.borderColor = 'rgba(255, 51, 255, 0.8)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(255, 51, 255, 0.2))';
            e.currentTarget.style.borderColor = 'rgba(255, 51, 255, 0.5)';
          }}
        >
          Create Node
        </button>
      </div>
      <div style={{ marginTop: 12, fontSize: 10, color: 'rgba(0, 255, 204, 0.6)' }}>
        Valid keys: OMEGA-USER-001, OMEGA-ADMIN-007
      </div>
    </div>
  );
}
