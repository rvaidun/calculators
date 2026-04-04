import os
from flask import Flask, request, jsonify
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application, convert_xor
import calculatorsfuncs

transformations = (standard_transformations +
                   (implicit_multiplication_application,) + (convert_xor,))

app = Flask(__name__, static_folder='./build', static_url_path='/')
calcs = {
    'discriminant': calculatorsfuncs.saddle_min_max,
    'tangentplane': calculatorsfuncs.tangent_plane_to_graph,
    'derivative': calculatorsfuncs.derivative,
    'partial_derivative': calculatorsfuncs.partial_derivative,
    'taylor': calculatorsfuncs.taylor,
    'constraint': calculatorsfuncs.constraint,
    'divcurl': calculatorsfuncs.divcurl,
}


@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')


@app.route('/calculator', methods=['POST'])
def calculator():
    if not request.json:
        return jsonify({'error': 'Invalid request body'}), 400

    calculator_name = request.json.get('calculator')
    data = request.json.get('data')

    if calculator_name not in calcs:
        return jsonify({'error': f'Unknown calculator: {calculator_name}'}), 400

    if not isinstance(data, dict):
        return jsonify({'error': 'Invalid data payload'}), 400

    try:
        result = calcs[calculator_name](data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    debug = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    app.run(debug=debug)
