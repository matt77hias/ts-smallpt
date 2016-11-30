enum ReflectionType {
    DIFFUSE = 0,
    SPECULAR,
    REFRACTIVE
}

class Sphere {

    public static readonly EPSILON_SPHERE: number = 1.0e-4;

    private _r: number;
    private _p: Vector3;
    private _e: Vector3;
    private _f: Vector3;
    private _reflection_t: ReflectionType;

    public constructor(r: number, p: Vector3, e: Vector3, f: Vector3, reflection_t: ReflectionType) {
        this.r = r;
        this.p = p.copy();
        this.e = e.copy();
        this.f = f.copy();
        this.reflection_t = reflection_t;
    }

    public get r(): number {
        return this._r;
    }
    public set r(a: number) {
        this._r = a;
    }
    public get p(): Vector3 {
        return this._p;
    }
    public set p(a: Vector3) {
        this._p = a;
    }
    public get e(): Vector3 {
        return this._e;
    }
    public set e(a: Vector3) {
        this._e = a;
    }
    public get f(): Vector3 {
        return this._f;
    }
    public set f(a: Vector3) {
        this._f = a;
    }
    public get reflection_t(): ReflectionType {
        return this._reflection_t;
    }
    public set reflection_t(a: ReflectionType) {
        this._reflection_t = a;
    }

    public intersect(ray: Ray): boolean {
        let op: Vector3 = Vector3.sub(this.p, ray.o);
        let dop: number = Vector3.dot(ray.d, op);
        let D: number = dop * dop - Vector3.dot(op, op) + this.r * this.r;

        if (D < 0) {
            return false;
        }

        let sqrtD: number = Math.sqrt(D);

        let tmin: number = dop - sqrtD;
        if (ray.tmin < tmin && tmin < ray.tmax) {
            ray.tmax = tmin;
            return true;
        }

        let tmax: number = dop + sqrtD;
        if (ray.tmin < tmax && tmax < ray.tmax) {
            ray.tmax = tmax;
            return true;
        }

        return false;
    }
}