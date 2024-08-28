from fastapi import APIRouter, HTTPException, Depends, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from app.api.endpoints.login import oauth2

contact_chat = APIRouter()

class ConnectionManager:
    def __init__(self):
        model = {
            'client_id': str,
            'ws': WebSocket,
        }
        self.active_connections = []

    async def connect(self, websocket: WebSocket, client_id: str):
        for connection in self.active_connections:
            if connection['client_id'] == client_id:
                self.disconnect(connection['ws'])
        await websocket.accept()
        self.active_connections.append({'client_id': client_id, 'ws': websocket})
        print(manager.active_connections)

    def disconnect(self, websocket: WebSocket):
        for connection in self.active_connections:
            if websocket == connection['ws']:
                self.active_connections.remove(connection)

    async def send_personal_message(self, message: str, websocket: WebSocket, current_user):
        data = {
            'username': current_user.username,
            'avatar': current_user.avatar,
            'content': message,
        }
        await websocket.send_json(data)

    async def broadcast(self, message: str, websocket: WebSocket, current_user):
        data = {
            'username': current_user.username,
            'avatar': current_user.avatar,
            'content': message,
        }
        for connection in self.active_connections:
            if connection['ws'] != websocket:
                await connection['ws'].send_json(data)

manager = ConnectionManager()

@contact_chat.websocket("/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    current_user = oauth2.get_current_user_by_token(token)
    await manager.connect(websocket, token)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"{data}", websocket, current_user)
            await manager.broadcast(f"{data}", websocket, current_user)
    except WebSocketDisconnect:
        manager.disconnect(websocket)