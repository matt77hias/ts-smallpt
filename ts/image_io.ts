const GAMMA = 2.2;

function write_ppm(w: number, h: number, Ls: Vector3[]): void {
    let data: string = "P3\n" + w + " " + h + "\n255\n";
    for (let y: number = 0; y < h; ++y) {
        for (let x: number = 0; x < w; ++x) {
            let L: Vector3 = Ls[y * w + x];
            data += to_byte(L.x, GAMMA) + " " + to_byte(L.y, GAMMA) + " " + to_byte(L.z, GAMMA) + " ";
        }
    }
    download_file(data, "ts-smallpt.ppm", "text/plain");
}

interface HTMLAnchorElement {
    download: string;
}

function download_file(data: string, fname: string, type: string): void {
    let file: Blob = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, fname);
    }
    else {
        // Others
        let url: string = URL.createObjectURL(file);
        let a: HTMLAnchorElement = document.createElement("a");
        a.href = url;
        a.download = fname;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function display(w: number, h: number, Ls: Vector3[]): void {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("smallpt-canvas");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    for (let y: number = 0; y < h; ++y) {
        for (let x: number = 0; x < w; ++x) {
            let L: Vector3 = Ls[y * w + x];
            context.fillStyle = "rgba(" + to_byte(L.x, GAMMA) + ", " + to_byte(L.y, GAMMA) + ", " + to_byte(L.z, GAMMA) + ", 1.0)";
            context.fillRect(x, y, 1, 1);
        }
    }
}