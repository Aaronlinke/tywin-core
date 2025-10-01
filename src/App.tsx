import NexusCanvas from './components/NexusCanvas';
import ControlPanel from './components/ControlPanel';
import MetricsPanel from './components/MetricsPanel';
import StatusBar from './components/StatusBar';
import { useSimulatedWebSockets } from './hooks/useSimulatedWebSockets';

const App = () => {
  const { state, createNode } = useSimulatedWebSockets();

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#0a0a12',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <NexusCanvas nodes={state.nodes} links={state.links} />
      <ControlPanel onCreate={(key) => createNode(key, 'dynamic')} />
      <MetricsPanel
        nodesCreated={state.metrics.nodesCreated}
        linksCreated={state.metrics.linksCreated}
        activeNodes={state.nodes.length}
        activeLinks={state.links.length}
      />
      <StatusBar />
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #0ff, #f0f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.1,
            letterSpacing: 8,
            fontFamily: 'monospace'
          }}
        >
          OMEGA
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'rgba(0, 255, 204, 0.15)',
            fontFamily: 'monospace',
            letterSpacing: 4,
            marginTop: -12
          }}
        >
          NEXUS PROTOCOL
        </p>
      </div>
    </div>
  );
};

export default App;
