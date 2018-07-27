# coding: utf-8

import tornado.ioloop
import tornado.web
import tornado.websocket

import os
import json


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')

    def post(self):
        self.write("Hello, world post")


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    waiters = set()
    logs = []

    def open(self, *args, **kwargs):
        print("open")
        self.waiters.add(self)
        for (name, message) in self.logs:
            self.write_message({'name': name, 'message': message})

    def on_message(self, msg):
        print("msg:::", msg)
        msgObj = json.loads(msg)
        message = msgObj['message']
        name = msgObj['name'] or '(Annonymous)'
        self.logs.append((name, message))
        for waiter in self.waiters:
            if waiter == self:
                continue
            waiter.write_message(json.dumps({
                'name': name,
                'message': message
            }))

    def on_close(self):
        print("on close")
        self.waiters.remove(self)

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/ws/", WebSocketHandler)],
    static_path=os.path.join(os.path.dirname(__file__), "static"))

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
