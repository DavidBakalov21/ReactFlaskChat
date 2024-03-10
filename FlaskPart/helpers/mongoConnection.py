from pymongo import MongoClient
import certifi
def get_mongo_collection():
    try:
        client = MongoClient('mongodb+srv://dbakalov:GW40QUxsOcyLzsY7@djangoapp.cpm7frk.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())
        db = client['Chatbot']
        collection = db['Accounts']
        return collection
    except Exception as e:
        print("can't reach mongo")
        return None  