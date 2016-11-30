const M_PI = 3.14159265358979323846;
function trunc(x) {
    return (x > 0) ? Math.floor(x) : Math.ceil(x);
}
function clamp(x, low, high) {
    return (x > high) ? high : ((x < low) ? low : x);
}
function to_byte(x, gamma) {
    return Math.floor(clamp(255.0 * Math.pow(x, 1.0 / gamma), 0.0, 255.0));
}
