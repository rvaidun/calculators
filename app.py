from flask import Flask, render_template, request, Response, url_for, redirect, session, jsonify
from sympy.parsing.sympy_parser import parse_expr
from sympy import *
import calculatorsfuncs
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application, convert_xor

transformations = (standard_transformations +
                   (implicit_multiplication_application,) + (convert_xor,) )

app = Flask(__name__, static_folder='./build', static_url_path='/')
calcs = {'discriminant': calculatorsfuncs.saddle_min_max,
         'tangentplane': calculatorsfuncs.tangent_plane_to_graph,
         'derivative': calculatorsfuncs.derivative,
         'partial_derivative': calculatorsfuncs.partial_derivative,
         'taylor': calculatorsfuncs.taylor,
         }


def divergence(matheq):
    x, y, z = symbols('x y z')


@app.route('/', methods=['GET'])
@app.route('/derivative')
@app.route('/partial-derivative')
@app.route('/help')
@app.route('/tangentplane')
@app.route('/taylor')
@app.route('/discriminant')
def index():
    return app.send_static_file('index.html')


@app.route('/calculator', methods=['POST'])
def calculator():
    print(request.json)
    if request.json['calculator'] in calcs:
        return jsonify(calcs[request.json['calculator']](request.json['data']))


if __name__ == '__main__':
    app.run(debug=True)
