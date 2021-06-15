import math

from sympy import *
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application, convert_xor, auto_symbol
from sympy.parsing.sympy_parser import parse_expr


def my_transformations(a, b, c):
    result = []
    for t in a:
        if t[1] == 'e':
            result.append((t[0], 'E'))
        else:
            result.append(t)
    return result


transformations = ((my_transformations,) + standard_transformations + (implicit_multiplication_application, convert_xor))


# x^3+y^4-6*x-2*y^2+2

def derivative(data):
    x = symbols('x')
    parsed = parse_expr(data['mathequation'], transformations=transformations)
    return latex(diff(parsed, x))


def partial_derivative(data):
    respect_to_var = data['respectTo']
    try:
        respect_to_var = int(respect_to_var)
        return "Error"
    except ValueError:
        print("Letter passed in")
    x = symbols(f'{respect_to_var}')
    if data['mathequation'] == "":
        return "Empty"
    data['mathequation'] = data['mathequation']
    eq = parse_expr(data['mathequation'],
                    transformations=transformations)
    print(diff(eq, x))
    return latex(diff(eq, x))


def saddle_min_max(data):
    x, y = symbols('x y', real=True)

    f = parse_expr(data['mathequation'], locals(),transformations=transformations)
    # print(type(fTest))
    # f = eval('x**3+y**4-6*x-2*y**2+2')
    # print(type(f))
    # print(fTest==f)
    fx = diff(f, x)
    fy = diff(f, y)
    D = diff(fx, x) * diff(fy, y) - diff(diff(f, x), y) ** 2
    mina = []
    maxa = []
    sp = []
    op = []
    ret = {}
    ret['steps'] = {'discriminant': [
        {'text': "The Derivative of f with respect to x"}, {'latex': latex(fx)},
        {'text': "The Derivative of fx with respect to x"}, {'latex': latex(diff(fx, x))},
        {'text': "The derivative of f with respect to y"}, {'latex': latex(fy)},
        {'text': "The derivative of fy with respect to y"}, {'latex': latex(diff(fy, y))},
        {'text': "The derivative of f with respect to x and y"}, {'latex': latex(diff(diff(f, x), y))}
    ]}
    ret['steps']['saddlepoints'] = [
        {'text': "Solving for x and y with by setting derivatives equal"}, {'latex': latex(solve([fx, fy], (x, y)))},
        {
            'text': "If you plug in the point into the discriminant equation and value is less than 0 it is a saddle point"},
        {
            'text': "For all values greater than 0, plug into the double derivative with respect to x. If greater than 0 local minima, if it is less than 0 local maxima"},
    ]
    solved = solve([fx, fy], (x, y))
    if isinstance(solved,dict):
        solved = [(solved[x], solved[y])]
    for l in solved:
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
    hardcoded = E ** (5 * x - 6 * y)
    print('hardcoded', latex(hardcoded))
    dzx = diff(f, x).subs(x, xs).subs(y, ys)
    print('dzx', latex(dzx))
    dzx
    dzy = diff(f, y).subs(x, xs).subs(y, ys)
    print('dzy', latex(dzy))
    dzy
    fab = f.subs(x, xs).subs(y, ys)
    print('fab', latex(fab))
    ans = fab + dzx * (x - xs) + dzy * (y - ys)
    return {'answer': latex(ans)}


def mtaylor(funexpr, x, mu, order=1):
    nvars = len(x)
    hlist = ['__h' + str(i + 1) for i in range(nvars)]
    command = ''
    command = "symbols('" + '  '.join(hlist) + "')"
    hvar = eval(command)
    # mtaylor is utaylor for specificly defined function
    t = symbols('t')
    # substitution
    loc_funexpr = funexpr
    for i in range(nvars):
        locvar = x[i]
        locsubs = mu[i] + t * hvar[i]
        loc_funexpr = loc_funexpr.subs(locvar, locsubs)
    # calculate taylorseries
    g = 0
    for i in range(order + 1):
        g += loc_funexpr.diff(t, i).subs(t, 0) * t ** i / math.factorial(i)

    # resubstitute
    for i in range(nvars):
        g = g.subs(hlist[i], x[i] - mu[i])

    g = g.subs(t, 1)
    return g


def taylor(data):
    x, y = symbols('x y')
    f = parse_expr(data['mathequation'], transformations=transformations)
    vars = [x, y]
    try:
        mu = [int(x) for x in data['point']]
    except ValueError:
        return "Error"
    order = data['order']
    order = int(order)
    print(mu)
    print(type(order))
    ans = mtaylor(f, vars, mu, order=order)
    return latex(ans)
