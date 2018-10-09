
const IPFS = window.Ipfs

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
});

ipfs.on('ready',  async () => {
    const id = await ipfs.id();
    console.log('ipfs is ready', id.id);
})

function repo() {
  return 'ipfs' + Math.random()
}

export default ipfs;


