import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pytest
from calculatorsfuncs import (
    derivative,
    partial_derivative,
    saddle_min_max,
    tangent_plane_to_graph,
    taylor,
    constraint,
    divcurl,
)


class TestDerivative:
    def test_polynomial(self):
        result = derivative({'mathequation': 'x**2'})
        assert '2 x' in result

    def test_trig_sin(self):
        result = derivative({'mathequation': 'sin(x)'})
        assert '\\cos' in result

    def test_constant(self):
        result = derivative({'mathequation': '5'})
        assert result == '0'

    def test_exponential(self):
        result = derivative({'mathequation': 'e**x'})
        assert 'e^{x}' in result or 'e^x' in result

    def test_product_rule(self):
        result = derivative({'mathequation': 'x*sin(x)'})
        assert result != '0'


class TestPartialDerivative:
    def test_basic_wrt_x(self):
        result = partial_derivative({'mathequation': 'x**2 + y**2', 'respectTo': 'x'})
        assert '2 x' in result

    def test_basic_wrt_y(self):
        result = partial_derivative({'mathequation': 'x**2 + y**2', 'respectTo': 'y'})
        assert '2 y' in result

    def test_numeric_variable_returns_error(self):
        result = partial_derivative({'mathequation': 'x**2', 'respectTo': '3'})
        assert result == 'Error'

    def test_empty_equation_returns_empty(self):
        result = partial_derivative({'mathequation': '', 'respectTo': 'x'})
        assert result == 'Empty'

    def test_treats_other_vars_as_constants(self):
        result = partial_derivative({'mathequation': 'x**2 + z**2', 'respectTo': 'x'})
        assert '2 x' in result


class TestSaddleMinMax:
    def test_returns_required_keys(self):
        result = saddle_min_max({'mathequation': 'x**3 + y**4 - 6*x - 2*y**2 + 2'})
        assert 'discriminant' in result
        assert 'saddlepoints' in result
        assert 'min' in result
        assert 'max' in result
        assert 'steps' in result

    def test_steps_structure(self):
        result = saddle_min_max({'mathequation': 'x**2 + y**2'})
        assert 'discriminant' in result['steps']
        assert 'saddlepoints' in result['steps']
        assert isinstance(result['steps']['discriminant'], list)

    def test_paraboloid_has_minimum(self):
        result = saddle_min_max({'mathequation': 'x**2 + y**2'})
        assert len(result['min']) > 0

    def test_saddle_point_detected(self):
        result = saddle_min_max({'mathequation': 'x**2 - y**2'})
        assert len(result['saddlepoints']) > 0

    def test_discriminant_is_latex_string(self):
        result = saddle_min_max({'mathequation': 'x**2 + y**2'})
        assert isinstance(result['discriminant'], str)


class TestTangentPlane:
    def test_basic_paraboloid(self):
        result = tangent_plane_to_graph({'mathequation': 'x**2 + y**2', 'point': [1, 1]})
        assert 'answer' in result
        assert isinstance(result['answer'], str)

    def test_at_origin(self):
        result = tangent_plane_to_graph({'mathequation': 'x**2 + y**2', 'point': [0, 0]})
        assert 'answer' in result

    def test_linear_function(self):
        result = tangent_plane_to_graph({'mathequation': 'x + y', 'point': [1, 2]})
        assert 'answer' in result


class TestTaylor:
    def test_basic_1d_sin(self):
        result = taylor({'mathequation': 'sin(x)', 'point': [0, 0], 'order': '2'})
        assert isinstance(result, str)
        assert result != 'Error'

    def test_polynomial_exact(self):
        result = taylor({'mathequation': 'x**2', 'point': [0, 0], 'order': '2'})
        assert isinstance(result, str)

    def test_invalid_point_returns_error(self):
        result = taylor({'mathequation': 'x**2', 'point': ['a', 'b'], 'order': '2'})
        assert result == 'Error'

    def test_order_zero(self):
        result = taylor({'mathequation': 'sin(x)', 'point': [0, 0], 'order': '0'})
        assert isinstance(result, str)


class TestDivCurl:
    def test_basic_returns_list_of_two(self):
        result = divcurl({'x': 'x', 'y': 'y', 'z': 'z'})
        assert isinstance(result, list)
        assert len(result) == 2

    def test_zero_field(self):
        result = divcurl({'x': '0', 'y': '0', 'z': '0'})
        assert result[0] == '0'

    def test_divergence_of_linear_field(self):
        result = divcurl({'x': 'x', 'y': 'y', 'z': 'z'})
        assert '3' in result[0]

    def test_curl_of_irrotational_field(self):
        result = divcurl({'x': 'x', 'y': 'y', 'z': 'z'})
        assert result[1] != ''

    def test_returns_latex_strings(self):
        result = divcurl({'x': 'x**2', 'y': 'y**2', 'z': 'z**2'})
        assert isinstance(result[0], str)
        assert isinstance(result[1], str)
