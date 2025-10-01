export type NodeT = {
  id: string;
  type: string;
  energy: number;
  createdAt: number;
  ttl: number;
  status: 'active' | 'expired';
  signature: string;
};

export type LinkT = {
  id: string;
  from: string;
  to: string;
  intensity: number;
  createdAt: number;
  signature: string;
};

export type StateMsg = {
  nodes: NodeT[];
  links: LinkT[];
  metrics: {
    nodesCreated: number;
    linksCreated: number;
  };
};

export type EventMsg = {
  type: 'node_created' | 'link_created' | 'node_expired';
  node?: NodeT;
  link?: LinkT;
};
