class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class ImageObject {
    constructor(src, position, scale, borderRadius = 0.05, parallaxStrength = 0.08, lerpSpeed = 0.04) {
        this.src = src;
        this.position = position;
        this.scale = scale;
        this.borderRadius = borderRadius;
        this.parallaxStrength = parallaxStrength;
        this.lerpSpeed = lerpSpeed;

        this.smooth = new Vector2(0, 0);
        this._gl = null;
        this._tex = null;
        this._vao = null;

        this._imageAspect = null;
    }

    init(gl, program) {
        this._gl = gl;
        this._tex = this._loadTexture(program);
    }

    draw(mousePos, projMatrix, program) {
        const gl = this._gl;

        this.smooth.x += (mousePos.x - this.smooth.x) * this.lerpSpeed;
        this.smooth.y += (mousePos.y - this.smooth.y) * this.lerpSpeed;

        const tx = this.smooth.x * this.parallaxStrength;
        const ty = this.smooth.y * this.parallaxStrength;

        const mvp = new Float32Array(projMatrix);
        mvp[12] += tx;
        mvp[13] += ty;

        gl.useProgram(program);
        gl.bindVertexArray(this._vao);

        const uMatrix = gl.getUniformLocation(program, "uMatrix");
        gl.uniformMatrix4fv(uMatrix, false, mvp);

        const uRadius = gl.getUniformLocation(program, "uRadius");
        gl.uniform1f(uRadius, this.borderRadius);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._tex);
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    _loadTexture(program) {
        const gl = this._gl;

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Temp Pixel while image is loading
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([1, 0, 0, 255]));

        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);

            this._imageAspect = image.width / image.height;
            this._vao = this._buildGeometry(program);
        };
        image.src = this.src;

        return texture;
    }

    _buildGeometry(program) {
        const gl = this._gl;

        const imageAspect = this._imageAspect ?? 1.0;

        const hw = (this.scale.x * imageAspect) / 2;
        const hh = this.scale.y / 2;

        const vertices = new Float32Array([
            this.position.x - hw, this.position.y + hh, this.position.z, 0.0, 0.0,
            this.position.x - hw, this.position.y - hh, this.position.z, 0.0, 1.0,
            this.position.x + hw, this.position.y + hh, this.position.z, 1.0, 0.0,
            this.position.x + hw, this.position.y - hh, this.position.z, 1.0, 1.0,
        ]);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const FSIZE = vertices.BYTES_PER_ELEMENT;

        // Position
        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(aPosition);

        // UV Coordinates
        const aTexCoord = gl.getAttribLocation(program, "aTexCoord");
        gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
        gl.enableVertexAttribArray(aTexCoord);

        return vao;
    }


}