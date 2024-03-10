def display_all(collection,email):
    try:
        query = {"email": {"$ne": email}}
        documents = collection.find(query)
        documents_list = [doc for doc in documents]
        return documents_list
    except Exception as e:
        print(e)