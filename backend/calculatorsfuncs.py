from sympy import *
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application, convert_xor
from sympy.parsing.sympy_parser import parse_expr
def my_transformations(a, b, c):
    result = []
    for t in a:
        if t[1] == 'e':
            result.append((t[0], 'E'))
        else:
            result.append(t)
    return result

transformations = ((my_transformations,) + standard_transformations + (implicit_multiplication_application,convert_xor))

#x^3+y^4-6*x-2*y^2+2

def saddle_min_max(data):
    x, y = symbols('x y')
    data['mathequation'] = data['mathequation']
    f = parse_expr(data['mathequation'], transformations=transformations)
    fx = diff(f, x)
    fy = diff(f, y)
    D = diff(fx, x)*diff(fy, y)-diff(diff(f, x), y)**2
    mina = []
    maxa = []
    sp = []
    op = []
    ret = {}
    ret ['steps'] = {'discriminant': [
    {'text':"The Derivative of f with respect to x"}, {'latex':latex(fx)},
    {'text':"The Derivative of fx with respect to x"}, {'latex':latex(diff(fx, x))},
    {'text':"The derivative of f with respect to y"}, {'latex':latex(fy)},
    {'text':"The derivative of fy with respect to y"}, {'latex':latex(diff(fy, y))},
    {'text':"The derivative of f with respect to x and y"}, {'latex':latex(diff(diff(f, x), y))}
    ]}
    ret['steps']['saddlepoints'] = [
        {'text':"Solving for x and y with by setting derivatives equal"}, {'latex':latex(solve([fx, fy], (x, y)))},
        {'text':"If you plug in the point into the discriminant equation and value is less than 0 it is a saddle point"},
        {'text':"For all values greater than 0, plug into the double derivative with respect to x. If greater than 0 local minima, if it is less than 0 local maxima"},
    ]
    for l in solve([fx, fy], (x, y)):
        thisone = D.subs(x, l[0]).subs(y, l[1])
        if thisone < 0:
            sp.append(Tuple(l[0], l[1]))
        else:
            op.append(Tuple(l[0], l[1]))

    fxx = diff(fx, x)
    for s in op:
        if fxx.subs(x, s[0]).subs(y, s[1]) > 0:
            mina.append(s)
        else:
            maxa.append(s)

    ret['discriminant'] = latex(D)
    ret['saddlepoints'] = [latex(s) for s in sp]
    ret['min'] = [latex(s) for s in mina]
    ret['max'] = [latex(s) for s in maxa]
    return ret


def tangent_plane_to_graph(data):
    x, y = symbols('x y')
    xs = int(data['point'][0])
    ys = int(data['point'][1])
    data['mathequation'] = data['mathequation']
    f = parse_expr(data['mathequation'], transformations=transformations)
    print('f', latex(f))
    hardcoded = E**(5*x-6*y)
    print('hardcoded', latex(hardcoded))
    dzx = diff(f, x).subs(x, xs).subs(y, ys)
    print('dzx', latex(dzx))
    dzx
    dzy = diff(f, y).subs(x, xs).subs(y, ys)
    print('dzy', latex(dzy))
    dzy
    fab = f.subs(x, xs).subs(y, ys)
    print('fab', latex(fab))
    ans = fab + dzx*(x-xs) + dzy*(y-ys)
    return {'answer': latex(ans)}
