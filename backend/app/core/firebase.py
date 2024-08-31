from firebase_admin import credentials
import firebase_admin

def firebase_init():
    cred = credentials.Certificate('/home/tqhuy/Desktop/aaaa/backend/gameshop-d102c-firebase-adminsdk-3wale-c331e32ac6.json')
    firebase_admin.initialize_app(cred, {'storageBucket': 'gs://gameshop-d102c.appspot.com'})