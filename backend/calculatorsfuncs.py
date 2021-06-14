from sympy import *
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application, convert_xor
from sympy.parsing.sympy_parser import parse_expr

transformations = (standard_transformations + (implicit_multiplication_application,) + (convert_xor,))

#x^3+y^4-6*x-2*y^2+2

def saddle_min_max(data):
    x, y = symbols('x y')
    data['mathequation'] = data['mathequation']
    f = parse_expr(data['mathequation'], transformations=transformations).replace('e','E')
    fx = diff(f, x)
    fy = diff(f, y)
    D = diff(fx, x)*diff(fy, y)-diff(diff(f, x), y)**2
    print("Latex of D", latex(D))
    mina = []
    maxa = []
    sp = []
    op = []
    ret = {}
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
    data['mathequation'] = data['mathequation'].replace('e','E')
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
