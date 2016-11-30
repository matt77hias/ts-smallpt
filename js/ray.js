class Ray {
    constructor(o, d, tmin, tmax, depth) {
        this.o = o.copy();
        this.d = d.copy();
        this.tmin = tmin;
        this.tmax = tmax;
        this.depth = depth;
    }
    get o() {
        return this._o;
    }
    set o(a) {
        this._o = a;
    }
    get d() {
        return this._d;
    }
    set d(a) {
        this._d = a;
    }
    get tmin() {
        return this._tmin;
    }
    set tmin(a) {
        this._tmin = a;
    }
    get tmax() {
        return this._tmax;
    }
    set tmax(a) {
        this._tmax = a;
    }
    get depth() {
        return this._depth;
    }
    set depth(a) {
        this._depth = a;
    }
    eval(t) {
        return Vector3.add(this.o, Vector3.mul(this.d, t));
    }
}
