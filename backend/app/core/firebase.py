from firebase_admin import credentials
import firebase_admin

config = {
    "apiKey": "AIzaSyBIoU8KcboPVr8ZL8ImFF7ott_AuiwGhiY",
    "authDomain": "gameshop-d102c.firebaseapp.com",
    "databaseURL": "https://gameshop-d102c-default-rtdb.firebaseio.com",
    "projectId": "gameshop-d102c",
    "storageBucket": "gameshop-d102c.appspot.com",
    "serviceAccount": "C:/Users/tqhuy/Desktop/GameShop/backend/credentials_firebase.json"
}

def firebase_init():
    cred = credentials.Certificate('C:/Users/tqhuy/Desktop/GameShop/backend/credentials_firebase.json')
    firebase_admin.initialize_app(cred, {"storageBucket": "gameshop-d102c.appspot.com"})