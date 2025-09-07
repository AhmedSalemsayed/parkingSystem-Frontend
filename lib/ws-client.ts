let ws: WebSocket | null = null;

export function getWebSocket() {
  if (!ws) {
    ws = new WebSocket("ws://localhost:3000/api/v1/ws");
  }
  return ws;
}
