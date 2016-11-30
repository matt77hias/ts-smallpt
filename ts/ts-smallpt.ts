// Scene
const REFRACTIVE_INDEX_OUT: number = 1.0;
const REFRACTIVE_INDEX_IN: number = 1.5;

const spheres: Sphere[] = [
		new Sphere(1e5,  new Vector3(1e5 + 1, 40.8, 81.6),   new Vector3(0.0, 0.0, 0.0),    new Vector3(0.75, 0.25, 0.25),      ReflectionType.DIFFUSE),    //Left
		new Sphere(1e5,  new Vector3(-1e5 + 99, 40.8, 81.6), new Vector3(0.0, 0.0, 0.0),    new Vector3(0.25, 0.25, 0.75),      ReflectionType.DIFFUSE),	//Right
		new Sphere(1e5,  new Vector3(50, 40.8, 1e5),         new Vector3(0.0, 0.0, 0.0),    new Vector3(0.75, 0.75, 0.75),      ReflectionType.DIFFUSE),	//Back
		new Sphere(1e5,  new Vector3(50, 40.8, -1e5 + 170),  new Vector3(0.0, 0.0, 0.0),    new Vector3(0.0, 0.0, 0.0),         ReflectionType.DIFFUSE),	//Front
		new Sphere(1e5,  new Vector3(50, 1e5, 81.6),         new Vector3(0.0, 0.0, 0.0),    new Vector3(0.75, 0.75, 0.75),      ReflectionType.DIFFUSE),    //Bottom
		new Sphere(1e5,  new Vector3(50, -1e5 + 81.6, 81.6), new Vector3(0.0, 0.0, 0.0),    new Vector3(0.75, 0.75, 0.75),      ReflectionType.DIFFUSE),	//Top
		new Sphere(16.5, new Vector3(27, 16.5, 47),          new Vector3(0.0, 0.0, 0.0),    new Vector3(0.999, 0.999, 0.999),   ReflectionType.SPECULAR),	//Mirror
		new Sphere(16.5, new Vector3(73, 16.5, 78),          new Vector3(0.0, 0.0, 0.0),    new Vector3(0.999, 0.999, 0.999),   ReflectionType.REFRACTIVE), //Glass
		new Sphere(600,  new Vector3(50, 681.6 - .27, 81.6), new Vector3(12.0, 12.0, 12.0), new Vector3(0.0, 0.0, 0.0),         ReflectionType.DIFFUSE)	    //Light
	];

function intersect_scene(ray: Ray): [boolean, number] {
	let id: number = 0
	let hit: boolean = false
	for (let i: number = 0; i < spheres.length; ++i) {
		if (spheres[i].intersect(ray)) {
			hit = true;
			id = i;
		}
	}
	return [hit, id];
}

// Radiance
function radiance(ray: Ray): Vector3 {
	let r: Ray = ray;
	let L: Vector3 = new Vector3(0.0, 0.0, 0.0);
	let F: Vector3 = new Vector3(1.0, 1.0, 1.0);

	while (true) {
		let hit_record: [boolean, number] = intersect_scene(r);
		let hit: boolean = hit_record[0];
		if (!hit) {
			return L;
		}
		
		let id: number = hit_record[1];
		let shape: Sphere = spheres[id];
		let p: Vector3 = r.eval(r.tmax);
		let n: Vector3 = Vector3.sub(p, shape.p).normalize();

		L = Vector3.add(L, Vector3.mul(F, shape.e));
		F = Vector3.mul(F, shape.f);
		
		// Russian roulette
		if (r.depth > 4) {
			let continue_probability: number = shape.f.max_value();
			if (uniform_float() >= continue_probability) {
				return L;
			}
			F = Vector3.div(F, continue_probability);
		}

		// Next path segment
		switch (shape.reflection_t) {
			case ReflectionType.SPECULAR:
				let dRe: Vector3 = ideal_specular_reflect(r.d, n);
				r = new Ray(p, dRe, Sphere.EPSILON_SPHERE, Infinity, r.depth + 1);
				continue;
			case ReflectionType.REFRACTIVE:
				let refraction_record: [Vector3, number] = ideal_specular_transmit(r.d, n, REFRACTIVE_INDEX_OUT, REFRACTIVE_INDEX_IN);
				let dTr: Vector3 = refraction_record[0];
				let pr: number = refraction_record[1];
				F = Vector3.mul(F, pr);
				r = new Ray(p, dTr, Sphere.EPSILON_SPHERE, Infinity, r.depth + 1);
				continue
			default:
				let w: Vector3 = (Vector3.dot(n, r.d) < 0) ? n : Vector3.minus(n);
				let u: Vector3 = Vector3.cross((Math.abs(w.x) > 0.1) ? new Vector3(0.0, 1.0, 0.0) : new Vector3(1.0, 0.0, 0.0), w).normalize();
				let v: Vector3 = Vector3.cross(w, u);

				let sample_d: Vector3 = cosine_weighted_sample_on_hemisphere(uniform_float(), uniform_float());
				let d: Vector3 = Vector3.add(Vector3.add(Vector3.mul(sample_d.x, u), Vector3.mul(sample_d.y, v)), Vector3.mul(sample_d.z, w)).normalize();
				r = new Ray(p, d, Sphere.EPSILON_SPHERE, Infinity, r.depth + 1);
				continue;
		}   
	}
}

// Main
function main(): void {
	let t0: number = performance.now();

	let nb_samples: number = 64 / 4;
	let w: number = 1024;
	let h: number = 768;

	let eye: Vector3 = new Vector3(50, 52, 295.6);
	let gaze: Vector3 = new Vector3(0, -0.042612, -1).normalize();
	let fov: number = 0.5135;
	let cx: Vector3 = new Vector3(w * fov / h, 0.0, 0.0);
	let cy: Vector3 = Vector3.mul(Vector3.cross(cx, gaze).normalize(), fov);

	var Ls: Vector3[] = [];
	for (var j      = 0; j < w * h; ++j) {
		Ls.push(new Vector3(0.0, 0.0, 0.0));
	}
	
	for (let y: number = 0; y < h; ++y) {
		// pixel row
		console.log("\rRendering (" + (nb_samples * 4) + " spp) " + (100.0 * y / (h - 1)).toFixed(2) + "%");
		for (let x: number = 0; x < w; ++x) {
			// pixel column
			for (let sy: number = 0; sy < 2; ++sy) {
				let i: number = (h - 1 - y) * w + x;
				// 2 subpixel row
				for (let sx: number = 0; sx < 2; ++sx) {
					// 2 subpixel column
					let L: Vector3 = new Vector3(0.0, 0.0, 0.0);
					for (let s: number = 0; s < nb_samples; ++s) {
						//  samples per subpixel
						let u1: number = 2.0 * uniform_float();
						let u2: number = 2.0 * uniform_float();
						let dx: number = (u1 < 1) ? Math.sqrt(u1) - 1.0 : 1.0 - Math.sqrt(2.0 - u1);
						let dy: number = (u2 < 1) ? Math.sqrt(u2) - 1.0 : 1.0 - Math.sqrt(2.0 - u2);
						let d: Vector3 = Vector3.add(Vector3.add(Vector3.mul(cx, (((sx + 0.5 + dx) / 2.0 + x) / w - 0.5)), Vector3.mul(cy, (((sy + 0.5 + dy) / 2.0 + y) / h - 0.5))), gaze);
						L = Vector3.add(L, Vector3.mul(radiance(new Ray(Vector3.add(eye, Vector3.mul(d, 130)), d.normalize(), Sphere.EPSILON_SPHERE, Infinity, 0)), (1.0 / nb_samples)));
					}
					Ls[i] = Vector3.add(Ls[i], Vector3.mul(0.25, Vector3.clamp(L, 0.0, 1.0)));
				}
			}
		}
	}

	write_ppm(w, h, Ls);

	let t1: number = performance.now();
	console.log("Rendering time: " + (t1 - t0) + " ms");

	display(w, h, Ls);
}