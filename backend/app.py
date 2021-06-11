import latex2sympy
from flask import Flask, render_template, request, Response, url_for, redirect, session, jsonify
from sympy.parsing.sympy_parser import parse_expr
from sympy import *

from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application
transformations = (standard_transformations +
                   (implicit_multiplication_application,))


app = Flask(__name__, static_folder='./build', static_url_path='/')


def divergence(matheq):
    x, y, z = symbols('x y z')


@app.route('/', methods=['GET'])
@app.route('/derivative')
@app.route('/partial-derivative')
@app.route('/help')
def index():
    return app.send_static_file('index.html')


@app.route('/calculator', methods=['POST'])
def calculator():
    # print(request.json)
    print(request.json)
    x = symbols('x')
    request.json['mathequation'] = request.json['mathequation'].replace(
        '^', '**')
    eq = parse_expr(request.json['mathequation'],
                    transformations=transformations)
    return jsonify(latex(diff(eq, x)))


if __name__ == '__main__':
    app.run(debug=True)
