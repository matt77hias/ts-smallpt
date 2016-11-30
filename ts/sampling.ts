function uniform_sample_on_hemisphere(u1: number, u2: number): Vector3 {
	let sin_theta: number = Math.sqrt(Math.max(0.0, 1.0 - u1 * u1));
	let phi: number = 2.0 * M_PI * u2;
	return new Vector3(Math.cos(phi) * sin_theta, Math.sin(phi) * sin_theta, u1);
}
	
function cosine_weighted_sample_on_hemisphere(u1: number, u2: number): Vector3 {
	let cos_theta: number = Math.sqrt(1.0 - u1);
	let sin_theta: number = Math.sqrt(u1);
	let phi: number = 2.0 * M_PI * u2;
	return new Vector3(Math.cos(phi) * sin_theta, Math.sin(phi) * sin_theta, cos_theta);
}