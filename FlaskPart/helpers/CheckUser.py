def login_user(insert_data, collection, bcrypt):
    try:
        result=collection.find_one({"email":insert_data[0]})
        if bcrypt.check_password_hash(result['password'],insert_data[1]): 
          return "success" 
        else:
            return "failure"
    except Exception as e:
        print(e)