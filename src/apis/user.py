from flask_restful import Resource, reqparse, abort

from flask import jsonify

from src.models.user import UserModel, UserSchema

from src.database import db


class Users(Resource):
  def __init__(self):
    self.reqparse = reqparse.RequestParser()
    self.reqparse.add_argument('name', required=True)
    self.reqparse.add_argument('email', required=True)
    super(Users, self).__init__()


  def get(self):
    results = UserModel.query.all()
    jsonData = UserSchema(many=True).dump(results).data
    return jsonify({'items': jsonData})


  def post(self):
    args = self.reqparse.parse_args()
    user = UserModel(args.name, args.email)
    db.session.add(user)
    db.session.commit()
    db.session.close()
    res = UserSchema().dump(user).data
    return res, 201


class UserId(Resource):
  def __init__(self):
    self.reqparse = reqparse.RequestParser()
    self.reqparse.add_argument('name')
    self.reqparse.add_argument('email')
    super(UserId, self).__init__()


  def get(self, id):
    user = db.session.query(UserModel).filter_by(id=id).first()
    if user is None:
      abort(404)

    res = UserSchema().dump(user).data
    return res


  def put(self, id):
    user = db.session.query(UserModel).filter_by(id=id).first()
    if user is None:
      abort(404)
    args = self.reqparse.parse_args()
    for name, value in args.items():
      if value is not None:
        setattr(user, name, value)
    db.session.add(user)
    db.session.commit()
    db.session.close()
    return None, 204


  def delete(self, id):
    user = db.session.query(UserModel).filter_by(id=id).first()
    if user is not None:
      db.session.delete(user)
      db.session.commit()
      db.session.close()
    return None, 204