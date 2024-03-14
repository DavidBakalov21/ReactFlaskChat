def get_all_room_messages(collection,room):
    try:
        query = {"room": room}
        documents = collection.find(query)
        documents_list = [doc for doc in documents]
        return documents_list
    except Exception as e:
        return None