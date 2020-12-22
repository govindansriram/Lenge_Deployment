import json

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import db

from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt

from CardioWorkout import CardioWorkout
from StrengthCard import StrengthCard
from User import User

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGO_DBNAME'] = 'workoutOptions'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/workoutOptions'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/')
def flask_mongodb_atlas():
    return app.send_static_file('index.html')


# adds a user to the database
@app.route("/add_email", methods=['POST'])
def add_user():
    user_data = request.get_json()
    new_user = User(first_name=user_data['first_name'], last_name=user_data['last_name'], email=user_data['email'],
                    password=user_data['password'])
    db.insert_data(new_user)
    return "Connected to the data base and added new_user!"


@app.route('/users:<email>', methods=['GET'])
def get_user(email):
    temp_val = db.get_user(email)
    print(type(temp_val))
    if not temp_val:
        return "No such user with that email exists"
    else:
        temp_val.pop('_id')
        return jsonify(temp_val), "The user indeed exists"


@app.route("/add_workout:<email>", methods=['POST'])
def add_workout(email):
    user_workouts = request.get_json()
    temp_strcard = StrengthCard('Hard')
    temp_strcard.exercise_one = user_workouts["user_workouts"]['Exercise_One']
    temp_strcard.exercise_two = user_workouts["user_workouts"]['Exercise_Two']
    temp_strcard.exercise_Three = user_workouts["user_workouts"]['Exercise_Three']
    this_dict = temp_strcard.make_megadict()
    this_dict['Workout_Type'] = 'Strength'
    db.insert_workout(email, this_dict)
    return "Added strength"


@app.route('/email:<email>/difficulty:<difficulty>', methods=['GET'])
def get_workouts(email, difficulty):
    work_one = StrengthCard(difficulty).make_megadict()
    work_two = StrengthCard(difficulty).make_megadict()
    work_three = StrengthCard(difficulty).make_megadict()
    work_four = StrengthCard(difficulty).make_megadict()
    work_five = StrengthCard(difficulty).make_megadict()
    if not db.collec_exist(email):
        card_dict = [work_one,
                     work_two,
                     work_three,
                     work_four,
                     work_five
                    ]
        return jsonify(card_dict), "does not exist"
    else:
        name = email + ' Collection'
        my_col = db.db[name]

        for workout in my_col.find():
            if work_one == workout or work_two == workout or work_three == workout or work_four == workout \
                    or work_five == workout:
                get_workouts(email, difficulty)
        card_dict = [work_one,
                     work_two,
                     work_three,
                     work_four,
                     work_five
                    ]

    return jsonify(card_dict)


@app.route("/add_cardio:<email>", methods=['POST'])
def add_cardio(email):
    user_cardio = request.get_json()
    temp_val = CardioWorkout('Hard')
    temp_val.exercise = user_cardio["user_cardio"]["Exercise_One"]
    temp_val.exercise_two = user_cardio["user_cardio"]['Exercise_Two']
    temp_val.exercise_three = user_cardio["user_cardio"]['Exercise_Three']
    temp_val.circuit_sets = user_cardio["user_cardio"]['Circuit_sets']
    temp_dict = temp_val.make_dict()
    temp_dict['Workout_Type'] = 'Cardio'
    db.insert_workout(email, temp_dict)
    return "Added cardio"


@app.route('/cardio:<email>/difficulty:<difficulty>', methods=['GET'])
def get_cardio(email, difficulty):
    cardio_one = CardioWorkout(difficulty).make_dict()
    cardio_two = CardioWorkout(difficulty).make_dict()
    cardio_three = CardioWorkout(difficulty).make_dict()
    cardio_four = CardioWorkout(difficulty).make_dict()
    cardio_five = CardioWorkout(difficulty).make_dict()
    if not db.collec_exist(email):
        cardio_dict = [cardio_one,
                       cardio_two,
                       cardio_three,
                       cardio_four,
                       cardio_five]
        return jsonify(cardio_dict), "does not exist"
    else:
        name = email + ' Collection'
        my_col = db.db[name]

        for workout in my_col.find():
            if cardio_one == workout or cardio_two == workout or cardio_three == workout or cardio_four == workout \
                    or cardio_five == workout:
                get_cardio(email, difficulty)
            cardio_dict = [cardio_one,
                           cardio_two,
                           cardio_three,
                           cardio_four,
                           cardio_five]
            return jsonify(cardio_dict)

@app.route('/users/register', methods=["POST"])
def register():
    users = db.emails
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')

    response = users.find_one({'email': email})
    if response:
        result = {"error": "Account already exists"}
    else:
        user_id = users.insert({'first_name': first_name,'last_name': last_name,'email': email,'password': password})
        new_user = users.find_one({'_id': user_id})
        result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result' : result})


@app.route('/users/login', methods=['POST'])
def login():
    users = db.emails
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    error_message = "Invalid email and/or password."

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password.encode('utf-8')):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({"token":access_token})
        else:
            result = jsonify({"error":error_message})
    else:
        result = jsonify({"result":"No results found"})

    return result

@app.route('/past_workouts:<email>/difficulty:<Category>', methods=['GET'])
def get_past_workouts(email, Category):
    some_list = db.get_past_workouts(email, Category)
    return jsonify(some_list)

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
