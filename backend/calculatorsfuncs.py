from sympy import *


def saddle_min_max(f, x, y):
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
