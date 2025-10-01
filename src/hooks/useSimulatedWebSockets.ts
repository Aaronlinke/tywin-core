import { useEffect, useRef, useState } from 'react';
import type { StateMsg, NodeT, LinkT } from '../types';

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function hash(data: any): string {
  return Math.random().toString(36).substring(2, 15);
}

function createNode(type = 'dynamic'): NodeT {
  return {
    id: generateId(),
    type,
    energy: Math.random() * 100,
    createdAt: Date.now(),
    ttl: 30000 + Math.random() * 30000,
    status: 'active',
    signature: hash({ type, time: Date.now() })
  };
}

function createLink(fromId: string, toId: string): LinkT {
  return {
    id: generateId(),
    from: fromId,
    to: toId,
    intensity: Math.random(),
    createdAt: Date.now(),
    signature: hash({ fromId, toId })
  };
}

export function useSimulatedWebSockets() {
  const [state, setState] = useState<StateMsg>({
    nodes: [],
    links: [],
    metrics: { nodesCreated: 0, linksCreated: 0 }
  });
  
  const nodesRef = useRef<NodeT[]>([]);
  const linksRef = useRef<LinkT[]>([]);
  const metricsRef = useRef({ nodesCreated: 0, linksCreated: 0 });

  useEffect(() => {
    // Initialize with seed nodes
    for (let i = 0; i < 5; i++) {
      const node = createNode('seed');
      nodesRef.current.push(node);
      metricsRef.current.nodesCreated++;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      
      // Update energy and expire old nodes
      nodesRef.current = nodesRef.current.map(n => {
        if (now - n.createdAt > n.ttl) {
          return { ...n, status: 'expired' as const };
        }
        return { ...n, energy: Math.max(0, n.energy - Math.random() * 2) };
      }).filter(n => n.status !== 'expired');

      // Create links between random nodes
      if (nodesRef.current.length > 1 && Math.random() > 0.6) {
        const a = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        const b = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        if (a && b && a.id !== b.id) {
          const link = createLink(a.id, b.id);
          linksRef.current.push(link);
          metricsRef.current.linksCreated++;
        }
      }

      // Clean old links
      linksRef.current = linksRef.current.filter(link => {
        const fromExists = nodesRef.current.some(n => n.id === link.from);
        const toExists = nodesRef.current.some(n => n.id === link.to);
        return fromExists && toExists;
      });

      setState({
        nodes: [...nodesRef.current],
        links: [...linksRef.current],
        metrics: { ...metricsRef.current }
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const createNewNode = (userKey: string, type = 'dynamic') => {
    // Simulate license check
    const validKeys = ['OMEGA-USER-001', 'OMEGA-ADMIN-007'];
    if (!validKeys.includes(userKey)) {
      console.warn('Invalid license key');
      return;
    }

    const node = createNode(type);
    nodesRef.current.push(node);
    metricsRef.current.nodesCreated++;
  };

  return { state, createNode: createNewNode };
}
