interface MetricsPanelProps {
  nodesCreated: number;
  linksCreated: number;
  activeNodes: number;
  activeLinks: number;
}

export default function MetricsPanel({
  nodesCreated,
  linksCreated,
  activeNodes,
  activeLinks
}: MetricsPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(10, 10, 18, 0.85)',
        padding: 16,
        borderRadius: 8,
        border: '1px solid rgba(255, 51, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(255, 51, 255, 0.1)',
        fontFamily: 'monospace',
        color: '#cfe',
        minWidth: 200
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#f0f', fontSize: 14, fontWeight: 600 }}>
        System Metrics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <MetricRow label="Active Nodes" value={activeNodes} color="#0ff" />
        <MetricRow label="Active Links" value={activeLinks} color="#0ff" />
        <div style={{ height: 1, background: 'rgba(255, 51, 255, 0.2)', margin: '4px 0' }} />
        <MetricRow label="Total Nodes" value={nodesCreated} color="#f0f" />
        <MetricRow label="Total Links" value={linksCreated} color="#f0f" />
      </div>
      <div style={{ marginTop: 12, fontSize: 10, color: 'rgba(255, 51, 255, 0.6)' }}>
        Status: <span style={{ color: '#0f0' }}>ONLINE</span>
      </div>
    </div>
  );
}

function MetricRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
      <span style={{ color: 'rgba(207, 255, 238, 0.7)' }}>{label}:</span>
      <span
        style={{
          color,
          fontWeight: 700,
          fontSize: 16,
          textShadow: `0 0 10px ${color}`
        }}
      >
        {value}
      </span>
    </div>
  );
}
