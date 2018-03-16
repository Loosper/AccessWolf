from os.path import abspath, dirname

ROOT = abspath(dirname(dirname(__file__)))
# DB_TYPE = 'mysql+mysqldb'
# DB_PATH = 'c51segmentatio:mHf8hAkxVGH9@web01.hostbalkan.com/c51segmentatio'
DB_TYPE = "sqlite+pysqlite"
DB_PATH = '/' + ROOT + '/database.db'
PORT = 8080
HOST = 'localhost'
