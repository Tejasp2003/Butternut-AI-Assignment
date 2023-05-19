from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app)
load_dotenv('.env')
mongo_uri = os.getenv('MONGO_URI')

app.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app)

@app.route('/todos', methods=['GET'])
def get_all_todos():
    todos = mongo.db.todo.find()
    result = []
    for todo in todos:
        result.append({
            'id': str(todo['_id']),
            'task': todo['task'],
            'completed': todo['completed'],
            'createdAt': todo['createdAt'],
            'updatedAt': todo['updatedAt']
        })
    return jsonify(result)

@app.route('/todos', methods=['POST'])
def create_todo():
    task = request.json['task']
    current_time = datetime.now()
    todo = {
        'task': task,
        'completed': False,
        'createdAt': current_time,
        'updatedAt': current_time
    }
    todo_id = mongo.db.todo.insert_one(todo).inserted_id
    return jsonify({
        'id': str(todo_id),
        'task': task,
        'completed': False,
        'createdAt': current_time,
        'updatedAt': current_time
    })

@app.route('/todos/<id>', methods=['PUT'])
def update_todo(id):
    task = request.json['task']
    completed = request.json['completed']
    current_time = datetime.now()
    mongo.db.todo.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'task': task,
            'completed': completed,
            'updatedAt': current_time
        }}
    )
    return jsonify({
        'id': id,
        'task': task,
        'completed': completed,
        'createdAt': mongo.db.todo.find_one({'_id': ObjectId(id)})['createdAt'],
        'updatedAt': current_time
    })

@app.route('/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    mongo.db.todo.delete_one({'_id': ObjectId(id)})
    return jsonify({'id': id})

if __name__ == '__main__':
    app.run()
