var ReflectionType;
(function (ReflectionType) {
    ReflectionType[ReflectionType["DIFFUSE"] = 0] = "DIFFUSE";
    ReflectionType[ReflectionType["SPECULAR"] = 1] = "SPECULAR";
    ReflectionType[ReflectionType["REFRACTIVE"] = 2] = "REFRACTIVE";
})(ReflectionType || (ReflectionType = {}));
class Sphere {
    constructor(r, p, e, f, reflection_t) {
        this.r = r;
        this.p = p.copy();
        this.e = e.copy();
        this.f = f.copy();
        this.reflection_t = reflection_t;
    }
    get r() {
        return this._r;
    }
    set r(a) {
        this._r = a;
    }
    get p() {
        return this._p;
    }
    set p(a) {
        this._p = a;
    }
    get e() {
        return this._e;
    }
    set e(a) {
        this._e = a;
    }
    get f() {
        return this._f;
    }
    set f(a) {
        this._f = a;
    }
    get reflection_t() {
        return this._reflection_t;
    }
    set reflection_t(a) {
        this._reflection_t = a;
    }
    intersect(ray) {
        let op = Vector3.sub(this.p, ray.o);
        let dop = Vector3.dot(ray.d, op);
        let D = dop * dop - Vector3.dot(op, op) + this.r * this.r;
        if (D < 0) {
            return false;
        }
        let sqrtD = Math.sqrt(D);
        let tmin = dop - sqrtD;
        if (ray.tmin < tmin && tmin < ray.tmax) {
            ray.tmax = tmin;
            return true;
        }
        let tmax = dop + sqrtD;
        if (ray.tmin < tmax && tmax < ray.tmax) {
            ray.tmax = tmax;
            return true;
        }
        return false;
    }
}
Sphere.EPSILON_SPHERE = 1.0e-4;
