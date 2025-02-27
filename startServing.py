#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler,self).end_headers()

if __name__ == '__main__':
    httpd = HTTPServer(('localhost', 8003), CORSRequestHandler)
    httpd.serve_forever()
    # test(CORSRequestHandler, HTTPServer, port=8000)