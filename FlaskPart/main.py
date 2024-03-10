from flask import Flask
from helpers import mongoConnection, displayAll,CheckUser, signUp
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import ObjectId
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO, emit,join_room

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
bcrypt=Bcrypt(app)
socketio = SocketIO(app,cors_allowed_origins="http://localhost:3000")
def default(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, bytes):
        return obj.decode('utf-8')  # or 'latin1' if the encoding is not utf-8
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)
client=mongoConnection.get_mongo_collection()
@app.route('/test', methods=['POST'])
def hello_world():
    data = request.json
    info=displayAll.display_all(client,data.get('email'))
    sanitized_info = [{k: v for k, v in user.items() if k != 'password'} for user in info]
    converted_info = json.dumps(sanitized_info, default=default)
    return converted_info

@app.route('/singIn', methods=['POST'])
def checkEmail():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    return  jsonify({'status':CheckUser.login_user([email, password], client,bcrypt)})


@app.route('/singUp', methods=['POST'])
def SignUp():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    role = data.get('role')
    return  jsonify({'status':signUp.add_user([first_name,last_name,email,role,bcrypt.generate_password_hash(password)], client)})

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
   
@socketio.on('message')
def handle_message(message):
    print(message)
    emit('message', message, room=message['room'])
if __name__ == '__main__':
    socketio.run(app, debug=True)