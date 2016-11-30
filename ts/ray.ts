class Ray {

    private _o: Vector3;
    private _d: Vector3;
    private _tmin: number;
    private _tmax: number;
    private _depth: number;

    public constructor(o: Vector3, d: Vector3, tmin: number, tmax: number, depth: number) {
        this.o = o.copy();
        this.d = d.copy();
        this.tmin = tmin;
        this.tmax = tmax;
        this.depth = depth;
    }

    public get o(): Vector3 {
        return this._o;
    }
    public set o(a: Vector3) {
        this._o = a;
    }
    public get d(): Vector3 {
        return this._d;
    }
    public set d(a: Vector3) {
        this._d = a;
    }
    public get tmin(): number {
        return this._tmin;
    }
    public set tmin(a: number) {
        this._tmin = a;
    }
    public get tmax(): number {
        return this._tmax;
    }
    public set tmax(a: number) {
        this._tmax = a;
    }
    public get depth(): number {
        return this._depth;
    }
    public set depth(a: number) {
        this._depth = a;
    }

    public eval(t: number): Vector3 {
        return Vector3.add(this.o, Vector3.mul(this.d, t));
    }
}