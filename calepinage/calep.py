import copy
import math
import matplotlib.pyplot as plt
import numpy as np
import time


class Shift(object):
    def __init__(self, x=0, y=0, t=0):
        self.x = 0
        self.y = 0
        self.t = 0
        self.finished = False

    def next_state(self, xm, ym, dx, dy, dt):
        if self.t + dt < 2*math.pi:
            self.t += dt
        elif self.y + dy < ym:
            self.y += dy
            self.t = 0
        elif self.x + dx < xm:
            self.x += dx
            self.y = 0
            self.t = 0
        else:
            self.finished = True
        return self

    def __str__(self):
        str = "x={}_y={}_t={}".format(self.x, self.y, self.t)
        return str

class Piece(object):
    def __init__(self, pts):
        self.points = pts
        self.points_new_base = pts
        self.segments = [pt.sub(pts[0]) for pt in pts]
        self.distance = [s.size() for s in self.segments]
        self.angle_base = [s.angle() for s in self.segments]
        self.shift = Shift()
        self.compute_min_max()
        self.name = ""

    def reinit(self):
        self.shift = Shift()
        self.points_new_base = copy.copy(self.points)
        self.compute_min_max()

    def get_pos(self):
        print(self.name, self.shift)

    def compute_min_max(self):
        self.x_min = min([pt.x for pt in self.points_new_base])
        self.x_max = max([pt.x for pt in self.points_new_base])
        self.y_min = min([pt.y for pt in self.points_new_base])
        self.y_max = max([pt.y for pt in self.points_new_base])

    def __len__(self):
        return len(self.points)

    def move(self, shift):
        self.shift = shift
        self.points_new_base = [pt.rotate(shift.t) for pt in self.segments]
        pt_shift = Point(shift.x, shift.y)
        pt_shift = pt_shift.add(self.points[0])
        self.points_new_base = [pt.add(pt_shift) for pt in self.points_new_base]
        self.compute_min_max()

    def intersect(self, piece2, margin):
        if not intersect_box(self.x_min, self.x_max, self.y_min, self.y_max, piece2.x_min, piece2.x_max, piece2.y_min, piece2.y_max):
            return False
        if self.is_point_inside_piece(piece2.points_new_base[0]):
            return True
        for i in range(len(self)):
            pt1 = self.points_new_base[i]
            pt2 = self.points_new_base[(i+1)%(len(self))]
            for j in range(len(piece2)):
                pta = piece2.points_new_base[j]
                ptb = piece2.points_new_base[(j+1)%(len(piece2))]
                if intersect_segment(pt1, pt2, pta, ptb, margin):
                    return True
        return False

    def is_in_tableau(self, x, y):
        return self.x_min >= 0 and self.x_max <= x and self.y_min >= 0 and self.y_max <= y

    def is_point_inside_piece(self, pt):
        pt_out = Point(self.x_max + 2, self.y_min - 1)
        count_cross = 0
        for i in range(len(self.segments)):
            if intersect_segment(pt, pt_out, self.points_new_base[i], self.points_new_base[(i+1)%len(self.points_new_base)], 0):
                count_cross += 1
        if count_cross%2 == 0:
            return False
        else:
            return True

    def to_plot(self):
        x = np.zeros(len(self)+1)
        y = np.zeros(len(self)+1)
        for i, p in enumerate(self.points_new_base):
            x[i] = p.x
            y[i] = p.y
        x[len(self)] = x[0]
        y[len(self)] = y[0]
        return x, y

    def copy(self):
        return copy.deepcopy(self)

class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def size(self):
        return math.sqrt(self.x ** 2 + self.y ** 2)

    def dist(self, pt2):
        d = (self.y - pt2.y) ** 2 + (self.x - pt2.x) ** 2
        return math.sqrt(d)

    def add(self, pt2):
        p = Point(self.x + pt2.x, self.y + pt2.y)
        return p

    def sub(self, pt2):
        p = Point(self.x - pt2.x, self.y - pt2.y)
        return p

    def angle(self):
        if self.y == 0:
            if self.x < 0:
                return math.pi
            else:
                return 0
        t = self.y / (self.x + self.size())
        angle = 2 * math.atan(t)
        return angle

    def rotate(self, theta):
        angle = self.angle()
        new_angle = angle + theta
        d = self.size()
        new_pt = Point(d * math.cos(new_angle), d * math.sin(new_angle))
        return new_pt

    def is_in_tableau(self, x, y):
        return 0 <= self.x <= x and 0 <= self.y <= y

class Planche(object):
    def __init__(self, x, y, m=0):
        self.x = x
        self.y = y
        self.margin = m
        self.pieces = []

    def eval_complexite(self, dx, dy, dt):
        c = self.x/dx * self.y/dy * math.pi * 2 / dt
        c = len(self.pieces) ** c
        print("complexite : {}".format(c))

    def plot(self):
        plt.plot(np.array([0, 0, self.x, self.x, 0]), np.array([0, self.y, self.y, 0, 0]))
        for piece in self.pieces:
            x, y = piece.to_plot()
            plt.plot(x, y)
        plt.show()

    def is_piece_ok(self, ind_piece, ind_max=None):
        p = self.pieces[ind_piece]
        if not p.is_in_tableau(self.x, self.y):
            return False
        if ind_max is None:
            ind_max = len(self.pieces)
        for j in range(ind_max):
            if ind_piece != j:
                if p.intersect(self.pieces[j], self.margin):
                    return False
        return True

    def is_ok(self, pr=False):
        for i, p in enumerate(self.pieces):
            if not p.is_in_tableau(self.x, self.y):
                if pr:
                    print("piece {}  out of bounds".format(i))
                return False
        for i in range(len(self.pieces)):
            for j in range(i + 1, len(self.pieces)):
                if self.pieces[i].intersect(self.pieces[j], self.margin):
                    if pr:
                        print("intersect pieces {} and {}".format(i, j))
                    return False
        if pr:
            print("Okay.")
        return True

    def place_piece(self, dx, dy, dt, ind_piece, memory=False):
        piece = self.pieces[ind_piece]
        if memory:
            state = piece.shift
            state = state.next_state(self.x, self.y, dx, dy, dt)
        else:
            state = Shift()
        while not state.finished:
            piece.move(state)
            if self.is_piece_ok(ind_piece, ind_piece):
                return True
            state = state.next_state(self.x, self.y, dx, dy, dt)
        return False

    def get_pos(self):
        for p in self.pieces:
            p.get_pos()

    def try_all_pieces(self, dx, dy, dt):
        for ind in range(len(self.pieces)):
            self.place_piece(dx, dy, dt, ind)

    def try_all_pieces_2(self, dx, dy, dt, nmax=10000):
        ind = 0
        n = 0
        while n < nmax and not self.is_ok():
            n += 1
            if self.place_piece(dx, dy, dt, ind):
                ind += 1
            else:
                ind -= 1
            if ind == len(self.pieces):
                ind = 0
            if ind == -1:
                ind = len(self.pieces) - 1

    def brute_force(self, dx, dy, dt, ind=0):
        if ind == len(self.pieces):
            return True
        self.pieces[ind].reinit()
        test = 0
        while self.place_piece(dx, dy, dt, ind, memory=True):
            test += 1
            if self.brute_force(dx, dy, dt, ind=ind + 1):
                return True
        if test > 0:
            print("Test {} positions for piece {}".format(test, ind))
        return False

    def try_reduce(self, list_try, dx, dy, dt):
        for p in self.pieces:
            p.reinit()
        for x in list_try:
            self.x = x
            t = time.clock()
            #self.try_all_pieces_2(dx, dy, dt)
            self.brute_force(dx, dy, dt)
            t_end = time.clock() - t
            print(self.x, self.is_ok(), t_end)
            print("solution")
            self.get_pos()
            print("-----")
            self.plot()


def intersect_segment_range(pt1, pt2, pta, ptb):
    x_min = min(pt1.x, pt2.x)
    x_max = max(pt1.x, pt2.x)
    y_min = min(pt1.y, pt2.y)
    y_max = max(pt1.y, pt2.y)
    x_min1 = min(pta.x, ptb.x)
    x_max1 = max(pta.x, ptb.x)
    y_min1 = min(pta.y, ptb.y)
    y_max1 = max(pta.y, ptb.y)
    if intersect_segment_1d(x_min, x_max, x_min1, x_max1) and intersect_segment_1d(y_min, y_max, y_min1, y_max1):
        return True
    return False

def intersect_segment(pt1, pt2, pta, ptb, margin):
    if not intersect_segment_range(pt1, pt2, pta, ptb):
        return False

    #eq1 = pt1.x + k1 * (pt2.x - pt1.x) = pta.x + ka * (ptb.x - pta.x)
    #eq2 = pt1.y + k1 * (pt2.y - pt1.y) = pta.y + ka * (ptb.y - pta.y)

    #a*k1 + b*ka = c
    #d*k1 + e*ka = f

    a = pt2.x - pt1.x
    b = - (ptb.x - pta.x)
    c = pta.x - pt1.x
    d = pt2.y - pt1.y
    e = - (ptb.y - pta.y)
    f = pta.y - pt1.y
    m = np.array([[a, b], [d, e]])
    v = np.array([c, f])
    u = np.linalg.lstsq(m, v)[0]
    k1, ka = u

    diff  = np.dot(m, u) - v
    norm = diff[0] ** 2 + diff[1] ** 2

    #if np.linalg.det(m) < 1e-6:
    #    if np.abs()

    if norm > margin*margin:
        return False

    if 0 <= k1 <= 1 and 0 <= ka <= 1:
        return True

    v1 = pt2.sub(pt1)
    va = ptb.sub(pta)
    d1 = get_distance_from_k(v1.size(), k1)
    da = get_distance_from_k(va.size(), ka)
    if d1 < margin and da < margin:
        return True

    return False

def get_distance_from_k(size, k):
    if 0 <= k <= 1:
        d = -1
    else:
        m = k - 1 if k > 1 else -k
        d = size * m
    return d


def intersect_segment_1d(x_min, x_max, x_min1, x_max1):
    return x_min <= x_min1 <= x_max or x_min <= x_max1 <= x_max or x_min1 <= x_min <= x_max1 or x_min1 <= x_max <= x_max1


def intersect_box(x_min, x_max, y_min, y_max, x_min1, x_max1, y_min1, y_max1):
    return intersect_segment_1d(x_min, x_max, x_min1, x_max1) and intersect_segment_1d(y_min, y_max, y_min1, y_max1)


def main():
    piece_1 = Piece([Point(1,1), Point(2,2), Point(2,1)])
    piece_0 = Piece([Point(1,1), Point(2,2), Point(2,1)])
    piece_2 = Piece([Point(1,0), Point(0,2), Point(4,3), Point(6,0)])
    piece_3 = Piece([Point(1,0), Point(0,2), Point(5,5), Point(4, 1), Point(3, 3)])
    piece_4 = Piece([Point(0,0), Point(2,0), Point(2,2), Point(0,2), Point(1,1)])
    tablo = Planche(10, 10, 0.1)
    tablo.pieces = [piece_0, piece_1, piece_2, piece_3, piece_4]

    tablo.plot()

    test = [10, 8, 6, 5, 4]
    tablo.try_reduce(test, 0.1, 0.1, math.pi / 8.0)

def main_2():
    print("main2")
    p0 = Piece([Point(0.01,0), Point(0.01,5), Point(4,5), Point(4,0), Point(3,0), Point(3,4), Point(1,4), Point(1,0)])
    p1 = p0.copy()
    p2 = Piece([Point(0, 0), Point(0,7), Point(1.,7), Point(0.8,0)])
    p3 = p2.copy()

    tablo = Planche(6, 11, 0.001)
    tablo.pieces = [p0, p1, p2, p3]

    p0.move(Shift(0.,0.5, 0))
    p1.move(Shift(1.5,0., 0))
    p2.move(Shift(1.5, 1.5, 0))
    tablo.plot()

    test = [6, 4.5]
    tablo.try_reduce(test, 0.1, 0.5, math.pi)
    tablo.is_ok(pr=True)


def main_3():
    p0 = Piece([Point(0.01,0), Point(0.01,5), Point(4,5), Point(4,0), Point(3,0), Point(3,4), Point(1,4), Point(1,0)])
    p1 = p0.copy()
    t = time.clock()
    p0.move(Point(10,10), 1.)
    for a in range(1000):
        p0.intersect(p1, 0.01)
    t1 = time.clock() - t
    print(t1)


def main_4():
    x = Shift(1,2,3)
    print(x)


if __name__ == "__main__":
    main_4()
