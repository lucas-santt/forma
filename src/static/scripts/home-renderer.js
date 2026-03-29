var canvas, gl, shaderProgram;
var mouseX = 0, mouseY = 0;

window.onload = init;
window.addEventListener("mousemove", (e) => {
    // Normalization [-1, 1]
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

function init() {
    canvas = document.getElementById("bg-canvas");
    gl = canvas.getContext("webgl2");
    if(!gl) console.log("WebGL 2 not supported in this browser.");

    shaderProgram = createProgram();

    for(const obj of SCENE_OBJECTS) {
        obj.init(gl, shaderProgram);
    }

    requestAnimationFrame(render);
}

// WebGL

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram() {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, gsVertexShaderSrc);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, gsFragmentShaderSrc);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

function buildProjectionMatrix() {
    const aspect = canvas.width / canvas.height;
    const f = 1.0 / Math.tan(FOV / 2);

    // Perspective Matrix
    return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (Z_FAR + Z_NEAR) / (Z_NEAR - Z_FAR), -1,
        0, 0, (2 * Z_FAR * Z_NEAR) / (Z_NEAR - Z_FAR), 0
    ]);
}

function render() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(...BACKGROUND_COLOR);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST)

    const projMatrix = buildProjectionMatrix();

    for(const obj of SCENE_OBJECTS) {
        obj.draw(new Vector2(mouseX, mouseY), projMatrix, shaderProgram);
    }

    requestAnimationFrame(render);
}

var gsVertexShaderSrc = `#version 300 es

in vec4 aPosition;
in vec2 aTexCoord;

uniform mat4 uMatrix;
out vec2 vTexCoord;

void main() {
    gl_Position = uMatrix * aPosition;
    vTexCoord = aTexCoord;
}
`;

var gsFragmentShaderSrc = `#version 300 es

precision highp float;

uniform sampler2D uTexture;
uniform float uRadius;
in vec2 vTexCoord;
out vec4 outColor;

void main() {
    vec2 uv = vTexCoord;

    vec2 corner = clamp(uv, uRadius, 1.0 - uRadius);
    float dist = distance(uv, corner);

    if(dist > uRadius) discard;

    outColor = texture(uTexture, vec2(vTexCoord.x, vTexCoord.y));
}
`;