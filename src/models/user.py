from datetime import datetime

from flask_marshmallow.fields import fields

from marshmallow_sqlalchemy import ModelSchema

from flask_marshmallow import Marshmallow

from sqlalchemy_utils import UUIDType

from src.database import db

from src.config import Config

from sqlalchemy import create_engine, MetaData, Table, Column, Integer, Text, DateTime

# engine = create_engine('mysql+pymysql://root:root@localhost/hakusan-map?unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock')


# engine = create_engine(mysql_str = engine.url.URL(
#     drivername='mysql+pymysql',
#     username="root",
#     password="root",
#     database="hakusan-map",
#     query={
#         'unix_socket': '/usr/local/mysql5/mysqld.sock'
#     }
# ))

# metadata = MetaData(engine)

# ma = Marshmallow()

class UserModel(db.Model):
  # __table__ = Table('users', metadata,
  #   Column('id', Integer, primary_key=True),
  #   Column('name',Text, nullable=False),
  #   Column('email',Text),
  #   Column('password',Text),
  #   Column('createTime',DateTime, nullable=False, default=datetime.now),
  #   Column('updateTime',DateTime, nullable=False, default=datetime.now, onupdate=datetime.now),
  #   autoload=True, extend_existing=True)
  
  __tablename__ = 'users'
  __table_args__ = {'extend_existing': True}

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.Text, nullable=False)
  email = db.Column(db.Text)
  password = db.Column(db.Text)
  createTime = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updateTime = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

  def __init__(self, name, email):
    self.name = name
    self.email = email


  def __repr__(self):
    return '<UserModel {}:{}>'.format(self.id, self.name)


class UserSchema(ModelSchema):
  class Meta:
    model = UserModel

  createTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')
  updateTime = fields.DateTime('%Y-%m-%dT%H:%M:%S')