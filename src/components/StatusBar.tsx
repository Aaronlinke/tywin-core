export default function StatusBar() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        background: 'linear-gradient(to top, rgba(10, 10, 18, 0.95), transparent)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 16px 8px',
        fontFamily: 'monospace',
        fontSize: 11,
        color: 'rgba(0, 255, 204, 0.5)'
      }}
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <StatusItem label="Connection" value="SIMULATED" color="#ff0" />
        <StatusItem label="Protocol" value="WS-OMEGA-v1" color="#0ff" />
        <StatusItem label="Latency" value="~0ms" color="#0f0" />
        <StatusItem label="Mode" value="DEMO" color="#f0f" />
      </div>
    </div>
  );
}

function StatusItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <span>{label}:</span>
      <span style={{ color, fontWeight: 600 }}>{value}</span>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}`,
          animation: 'pulse 2s infinite'
        }}
      />
    </div>
  );
}
