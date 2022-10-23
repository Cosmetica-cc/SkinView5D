import * as ModelUtils from "./ModelUtils.js";

function createRenderer(height, width, antialias) {
    // three.js expects a canvas, this fakes it lmfao
    const canvas = document.createElement("canvas");

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: antialias,
        powerPreference: "high-performance"
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default PCFShadowMap

    const renderTarget = new THREE.WebGLRenderTarget(width, height, { // enables shadow mapping
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
    });

    renderer.setRenderTarget(renderTarget);
    return renderer;
}

function drawScene(scene, camera, width, height, imageType, antialias) {
    const renderer = createRenderer(width, height, antialias);
    console.log("created renderer");
    renderer.render(scene, camera);
    console.log("rendered scene");
    const frameBufferPixels = new Uint8Array(width * height * 4);
    const context = renderer.getContext();
    context.readPixels(0, 0, width, height, context.RGBA, context.UNSIGNED_BYTE, frameBufferPixels);
    const pixels = new Uint8Array(width * height * 4);
    for (let fbRow = 0; fbRow < height; fbRow++) { // framebuffer starts in bottom left but should be top left, invert vertically
        let rowData = frameBufferPixels.subarray(fbRow * width * 4, (fbRow + 1) * width * 4);
        let imgRow = height - fbRow - 1;
        pixels.set(rowData, imgRow * width * 4);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    imgData.data.set(pixels);
    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL(imageType);
}

class Scene {
    async setPanorama(source, fixed = false) {
        console.log("setting panorama");
        if (this.panoTexture) this.panoTexture.dispose();
        this.panoTexture = await ModelUtils.createTexture(source);
        if (!fixed) this.panoTexture.mapping = THREE.EquirectangularReflectionMapping;
        this.panoTexture.needsUpdate = true;
        this.scene.background = this.panoTexture;
    }

    attachCanvas(canvas) {
        const renderTarget = new THREE.WebGLRenderTarget(canvas.width, canvas.height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.UnsignedByteType,
        });

        this.renderer.setRenderTarget(renderTarget);
    }

    constructor(options) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(options.fov || 75, 1, 0.1, 1000);
        this.scene.add(this.camera);

        let awaitingComponents = [];
        function checkCompletion(id) {
            let index = awaitingComponents.indexOf(id);
            if (index >= 0) awaitingComponents.splice(index, 1);
            if (!awaitingComponents.length && options.readyCallback) options.readyCallback();
        }

        if (options.panorama) {
            awaitingComponents.push("panorama");
            this.setPanorama(options.panorama, options.fixedPanorama).then(()=> checkCompletion("panorama"));
        }
        if (options.canvas) {
            console.log("client requested for this to be live!");

            this.renderer = new THREE.WebGLRenderer({
                canvas: options.canvas,
                powerPreference: "high-performance"
            });
            this.renderer.setSize( options.canvas.width, options.canvas.height);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            // this.controls = new THREE.OrbitControls(this.camera, options.canvas);
            function animate(obj, renderCallback) {
                requestAnimationFrame(() => animate(obj, renderCallback));
                if (renderCallback) renderCallback(obj);
                obj.renderer.render(obj.scene, obj.camera);
            }
            animate(this, options.renderCallback);
        }
        if (!awaitingComponents.length) checkCompletion();
    }

    
}

export {
    drawScene,
    Scene
};