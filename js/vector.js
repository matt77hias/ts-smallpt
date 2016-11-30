class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    copy() {
        return new Vector3(this.x, this.y, this.z);
    }
    getElementAt(index) {
        switch (index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                return this.z;
        }
    }
    get x() {
        return this._x;
    }
    set x(a) {
        this._x = a;
    }
    get y() {
        return this._y;
    }
    set y(a) {
        this._y = a;
    }
    get z() {
        return this._z;
    }
    set z(a) {
        this._z = a;
    }
    min_dimension() {
        return (this.x < this.y && this.x < this.z) ? 0 : ((this.y < this.z) ? 1 : 2);
    }
    max_dimension() {
        return (this.x > this.y && this.x > this.z) ? 0 : ((this.y > this.z) ? 1 : 2);
    }
    min_value() {
        return (this.x < this.y && this.x < this.z) ? this.x : ((this.y < this.z) ? this.y : this.z);
    }
    max_value() {
        return (this.x > this.y && this.x > this.z) ? this.x : ((this.y > this.z) ? this.y : this.z);
    }
    norm2_squared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    norm2() {
        return Math.sqrt(this.norm2_squared());
    }
    normalize() {
        let a = 1.0 / this.norm2();
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this;
    }
    static minus(v) {
        return new Vector3(-v.x, -v.y, -v.z);
    }
    static add(v1, v2) {
        return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z) : new Vector3(v1.x + v2, v1.y + v2, v1.z + v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 + v2.x, v1 + v2.y, v1 + v2.z) : new Vector3(v1 + v2, v1 + v2, v1 + v2));
    }
    static sub(v1, v2) {
        return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z) : new Vector3(v1.x - v2, v1.y - v2, v1.z - v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 - v2.x, v1 - v2.y, v1 - v2.z) : new Vector3(v1 - v2, v1 - v2, v1 - v2));
    }
    static mul(v1, v2) {
        return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z) : new Vector3(v1.x * v2, v1.y * v2, v1.z * v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 * v2.x, v1 * v2.y, v1 * v2.z) : new Vector3(v1 * v2, v1 * v2, v1 * v2));
    }
    static div(v1, v2) {
        return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z) : new Vector3(v1.x / v2, v1.y / v2, v1.z / v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 / v2.x, v1 / v2.y, v1 / v2.z) : new Vector3(v1 / v2, v1 / v2, v1 / v2));
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static cross(v1, v2) {
        return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
    static eq(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
    }
    static ne(v1, v2) {
        return v1.x != v2.x || v1.y != v2.y || v1.z != v2.z;
    }
    static lt(v1, v2) {
        return v1.x < v2.x && v1.y < v2.y && v1.z < v2.z;
    }
    static le(v1, v2) {
        return v1.x <= v2.x && v1.y <= v2.y && v1.z <= v2.z;
    }
    static gt(v1, v2) {
        return v1.x > v2.x && v1.y > v2.y && v1.z > v2.z;
    }
    static ge(v1, v2) {
        return v1.x >= v2.x && v1.y >= v2.y && v1.z >= v2.z;
    }
    static apply_unary(f, v) {
        return new Vector3(f(v.x), f(v.y), f(v.z));
    }
    static apply_binary(f, v1, v2) {
        return new Vector3(f(v1.x, v2.x), f(v1.y, v2.y), f(v1.z, v2.z));
    }
    static sqrt(v) {
        return Vector3.apply_unary(Math.sqrt, v);
    }
    static pow(v, e) {
        let fixed_pow = function (a) { return Math.pow(a, e); };
        return Vector3.apply_unary(fixed_pow, v);
    }
    static abs(v) {
        return Vector3.apply_unary(Math.abs, v);
    }
    static min(v1, v2) {
        return Vector3.apply_binary(Math.min, v1, v2);
    }
    static max(v1, v2) {
        return Vector3.apply_binary(Math.max, v1, v2);
    }
    static round(v) {
        return Vector3.apply_unary(Math.round, v);
    }
    static ceil(v) {
        return Vector3.apply_unary(Math.ceil, v);
    }
    static floor(v) {
        return Vector3.apply_unary(Math.floor, v);
    }
    static trunc(v) {
        return Vector3.apply_unary(trunc, v);
    }
    static clamp(v, low, high) {
        let fixed_clamp = function (a) { return clamp(a, low, high); };
        return Vector3.apply_unary(fixed_clamp, v);
    }
    static lerp(a, v1, v2) {
        return Vector3.add(v1, Vector3.mul(a, Vector3.sub(v2, v1)));
    }
    static permute(v, x, y, z) {
        return new Vector3(v.getElementAt(x), v.getElementAt(y), v.getElementAt(z));
    }
}
