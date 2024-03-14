def add_message(insert_data, collection):
    try:
        collection.insert_one({"message":insert_data[0], "room":insert_data[1], "id":insert_data[2], "sender":insert_data[3]})
        return "success"
    except Exception as e:
        return 'error'