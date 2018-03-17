import tornado.ioloop
from tornado.web import Application, StaticFileHandler

from sqlalchemy.orm import sessionmaker

from db_schema import engine
from settings import HOST, PORT, ROOT
from handlers import StudentHandler, SingleStaticHandler


Session = sessionmaker(bind=engine)
handlers = [
    # (.*)
    (r'/', SingleStaticHandler, {'path': ROOT + '/client/index.html'}),
    (r"/students/?", StudentHandler, {'session': Session}),
    (r'/static/(.*)', StaticFileHandler, {'path': ROOT + '/client'}),
]

if __name__ == "__main__":
    app = Application(
        handlers,
        debug=True
    )

    print('Listening on port {PORT}.\nPress Ctrl^C to stop.')

    app.listen(PORT, HOST)
    loop = tornado.ioloop.IOLoop.instance()

    try:
        loop.start()
    except KeyboardInterrupt:
        print('Shutting down...')
    finally:
        loop.close()
        engine.dispose()
