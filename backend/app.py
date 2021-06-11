from sympy import *
from sympy.parsing.latex import parse_latex

from flask import Flask, render_template, request, Response, url_for, redirect, session, jsonify
import latex2sympy

app = Flask(__name__, static_folder='./build', static_url_path='/')


def divergence(matheq):
    x, y, z = symbols('x y z')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/calculator', methods=['POST'])
def calculator():
    # print(request.json)
    # print(request.json['mathequation'])
    x = symbols('x')
    # sym = latex2sympy.strToSympy(request.json['mathequation'])
    # eq = parse_latex(request.json['mathequation'])
    # dsym = diff(sym)
    # print(latex(dsym))
    # print(sym)
    print(request.json['mathequation'])
    # print(dsym)
    # return dsym
    if request.json['mathequation'] == "":
        print("empty field")
    return jsonify(request.json['mathequation'])
    # latexMathEq = latex(request.json['mathequation'])
    # print(latexMathEq)
    # return jsonify("test")


if __name__ == '__main__':
    app.run(debug=True)
