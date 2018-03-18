from os.path import abspath, dirname

ROOT = abspath(dirname(dirname(__file__)))
DB_TYPE = "sqlite+pysqlite"
DB_PATH = '/' + ROOT + '/database.db'
PORT = 8080
HOST = '0.0.0.0'

DEBUG_DB_ECHO = False
DEBUG_SERVER = True
