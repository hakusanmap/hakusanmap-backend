
import os

class SystemConfig:

  # sqlalchemy.create_engine(
    # mysql_str = sqlalchemy.engine.url.URL(
    #     drivername='mysql+pymysql',
    #     username="root",
    #     password="root",
    #     database="hakusan-map",
    #     query={
    #         'unix_socket': '/usr/local/mysql5/mysqld.sock'
    #     }
    # )
# )
  # SQLAlchemy
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?unix_socket=/var/lib/mysql/mysql.sock'.format(**{
      'user': 'root',
      'password': 'root',
      'host': '127.0.0.1',
      'port': '8889',
      'database': 'hakusan-map'
  })
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = False

Config = SystemConfig