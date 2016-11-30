class Vector3 {
	private _x: number;
	private _y: number;
	private _z: number;

	public constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public copy() : Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}
	
	public getElementAt(index: number): number {
		switch (index) {
		case 0:
			return this.x;
		case 1:
			return this.y;
		default:
			return this.z;
		}
	}
	public get x() : number {
		return this._x;
	}
	public set x(a: number) {
		this._x = a;
	}
	public get y(): number {
		return this._y;
	}
	public set y(a: number) {
	   this._y = a;
	}
	public get z(): number {
		return this._z;
	}
	public set z(a: number) {
		this._z = a;
	}

	public min_dimension(): number {
		return (this.x < this.y && this.x < this.z) ? 0 : ((this.y < this.z) ? 1 : 2);
	}
	public max_dimension(): number {
		return (this.x > this.y && this.x > this.z) ? 0 : ((this.y > this.z) ? 1 : 2);
	}
	public min_value(): number {
		return (this.x < this.y && this.x < this.z) ? this.x : ((this.y < this.z) ? this.y : this.z);
	}
	public max_value(): number {
		return (this.x > this.y && this.x > this.z) ? this.x : ((this.y > this.z) ? this.y : this.z);
	}
	
	public norm2_squared(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	public norm2(): number {
		return Math.sqrt(this.norm2_squared());
	}
	public normalize(): Vector3 {
		let a: number = 1.0 / this.norm2();
		this.x *= a;
		this.y *= a;
		this.z *= a;
		return this;
	}

	public static minus(v: Vector3): Vector3 {
		return new Vector3(-v.x, -v.y, -v.z);
	}

	public static add(v1: Vector3 | number, v2: Vector3 | number): Vector3 {
		return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z) : new Vector3(v1.x + v2, v1.y + v2, v1.z + v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 + v2.x, v1 + v2.y, v1 + v2.z) : new Vector3(v1 + v2, v1 + v2, v1 + v2));
	}
	public static sub(v1: Vector3 | number, v2: Vector3 | number): Vector3 {
		return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z) : new Vector3(v1.x - v2, v1.y - v2, v1.z - v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 - v2.x, v1 - v2.y, v1 - v2.z) : new Vector3(v1 - v2, v1 - v2, v1 - v2));
	}
	public static mul(v1: Vector3 | number, v2: Vector3 | number): Vector3 {
		return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z) : new Vector3(v1.x * v2, v1.y * v2, v1.z * v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 * v2.x, v1 * v2.y, v1 * v2.z) : new Vector3(v1 * v2, v1 * v2, v1 * v2));
	}
	public static div(v1: Vector3 | number, v2: Vector3 | number): Vector3 {
		return (v1 instanceof Vector3) ? ((v2 instanceof Vector3) ? new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z) : new Vector3(v1.x / v2, v1.y / v2, v1.z / v2)) : ((v2 instanceof Vector3) ? new Vector3(v1 / v2.x, v1 / v2.y, v1 / v2.z) : new Vector3(v1 / v2, v1 / v2, v1 / v2));
	}

	public static dot(v1: Vector3, v2: Vector3): number {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}
	public static cross(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
	}

	public static eq(v1: Vector3, v2: Vector3): boolean {
		return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
	}
	public static ne(v1: Vector3, v2: Vector3): boolean {
		return v1.x != v2.x || v1.y != v2.y || v1.z != v2.z;
	}
	public static lt(v1: Vector3, v2: Vector3): boolean {
		return v1.x < v2.x && v1.y < v2.y && v1.z < v2.z;
	}
	public static le(v1: Vector3, v2: Vector3): boolean {
		return v1.x <= v2.x && v1.y <= v2.y && v1.z <= v2.z;
	}
	public static gt(v1: Vector3, v2: Vector3): boolean {
		return v1.x > v2.x && v1.y > v2.y && v1.z > v2.z;
	}
	public static ge(v1: Vector3, v2: Vector3): boolean {
		return v1.x >= v2.x && v1.y >= v2.y && v1.z >= v2.z;
	}

	public static apply_unary(f: (a: number) => number, v: Vector3): Vector3 {
		return new Vector3(f(v.x), f(v.y), f(v.z));
	}
	public static apply_binary(f: (a: number, b: number) => number, v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(f(v1.x, v2.x), f(v1.y, v2.y), f(v1.z, v2.z));
	}

	public static sqrt(v: Vector3): Vector3 {
		return Vector3.apply_unary(Math.sqrt, v);
	}
	public static pow(v: Vector3, e: number): Vector3 {
		let fixed_pow: (a: number) => number = function (a: number): number { return Math.pow(a, e); };
		return Vector3.apply_unary(fixed_pow, v);
	}
	public static abs(v: Vector3): Vector3 {
		return Vector3.apply_unary(Math.abs, v);
	}
	public static min(v1: Vector3, v2: Vector3): Vector3 {
		return Vector3.apply_binary(Math.min, v1, v2);
	}
	public static max(v1: Vector3, v2: Vector3): Vector3 {
		return Vector3.apply_binary(Math.max, v1, v2);
	}
	public static round(v: Vector3): Vector3 {
		return Vector3.apply_unary(Math.round, v);
	}
	public static ceil(v: Vector3): Vector3 {
		return Vector3.apply_unary(Math.ceil, v);
	}
	public static floor(v: Vector3): Vector3 {
		return Vector3.apply_unary(Math.floor, v);
	}
	public static trunc(v: Vector3): Vector3 {
		return Vector3.apply_unary(trunc, v);
	}
	public static clamp(v: Vector3, low: number, high: number) {
		let fixed_clamp: (a: number) => number = function (a: number): number { return clamp(a, low, high); };
		return Vector3.apply_unary(fixed_clamp, v);
	}
	public static lerp(a: number, v1: Vector3, v2: Vector3): Vector3 {
		return Vector3.add(v1, Vector3.mul(a, Vector3.sub(v2, v1)));
	}
	public static permute(v: Vector3, x: number, y: number, z: number): Vector3 {
		return new Vector3(v.getElementAt(x), v.getElementAt(y), v.getElementAt(z));
	}
}