def add_user(insert_data, collection):
    try:
        result=collection.find_one({"email":insert_data[2]})
        if result is None:
            collection.insert_one({"first_name":insert_data[0], "last_name":insert_data[1], "email":insert_data[2], "selected_role":insert_data[3],"password":insert_data[4]})
            return "success"
        else:
            return "failure"
    except  Exception as e:
        print(e)