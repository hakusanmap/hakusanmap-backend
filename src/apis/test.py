from flask_restful import Resource, reqparse, abort

from flask import jsonify

from src.models.test import TestModel, TestSchema

from src.database import db


class Users(Resource):
  def __init__(self):
    self.reqparse = reqparse.RequestParser()
    self.reqparse.add_argument('name', required=True)
    self.reqparse.add_argument('state', required=True)
    super(Users, self).__init__()


  def get(self):
    results = TestModel.query.all()
    jsonData = TestSchema(many=True).dump(results).data
    return jsonify({'items': jsonData})


  def post(self):
    args = self.reqparse.parse_args()
    test = TestModel(args.name, args.state)
    db.session.add(test)
    db.session.commit()
    res = TestSchema().dump(test).data
    return res, 201


class UserId(Resource):
  def __init__(self):
    self.reqparse = reqparse.RequestParser()
    self.reqparse.add_argument('name')
    self.reqparse.add_argument('state')
    super(UserId, self).__init__()


  def get(self, id):
    test = db.session.query(TestModel).filter_by(id=id).first()
    if test is None:
      abort(404)

    res = TestSchema().dump(test).data
    return res


  def put(self, id):
    test = db.session.query(TestModel).filter_by(id=id).first()
    if test is None:
      abort(404)
    args = self.reqparse.parse_args()
    for name, value in args.items():
      if value is not None:
        setattr(test, name, value)
    db.session.add(test)
    db.session.commit()
    return None, 204


  def delete(self, id):
    test = db.session.query(TestModel).filter_by(id=id).first()
    if test is not None:
      db.session.delete(test)
      db.session.commit()
    return None, 204