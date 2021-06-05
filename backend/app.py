from flask import Flask, render_template, request, Response, url_for, redirect, session
app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)
