import * as THREE from "./Three.module.js";
import * as ModelUtils from "./ModelUtils.js";

import GL from "gl";
import Canvas from "canvas";

function createRenderer(width, height, antialias, alpha) {
    // three.js expects a canvas, this fakes it lmfao
    const canvas = {
        width,
        height,
        addEventListener: () => {},
        removeEventListener: () => {}
    };

    console.log("creating renderer");

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: alpha,
        powerPreference: "high-performance",
        antialias,
        context: GL(width, height, {
            preserveDrawingBuffer: true
        })
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

async function drawScene(scene, camera, width, height, imageType, antialias, alpha, downsample = 1) {
    width *= downsample;
    height *= downsample;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const renderer = createRenderer(width, height, antialias, alpha);
    if (antialias) {
        const composer = new THREE.EffectComposer(renderer);
        composer.setSize(width, height);
        const renderPass = new THREE.RenderPass(scene, camera);
        const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        composer.addPass(renderPass);
        composer.addPass(effectFXAA);
        const pixelRatio = renderer.getPixelRatio();
        effectFXAA.material.uniforms.resolution.value.set(1 / width / pixelRatio, 1 / height / pixelRatio);
        effectFXAA.renderToScreen = true;
        renderer.render(scene, camera);
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
    const frameBufferPixels = new Uint8Array(width * height * 4);
    const context = renderer.getContext();
    context.readPixels(0, 0, width, height, context.RGBA, context.UNSIGNED_BYTE, frameBufferPixels);
    const pixels = new Uint8Array(width * height * 4);
    for (let fbRow = 0; fbRow < height; fbRow++) { // framebuffer starts in bottom left but should be top left, invert vertically
        let rowData = frameBufferPixels.subarray(fbRow * width * 4, (fbRow + 1) * width * 4);
        let imgRow = height - fbRow - 1;
        pixels.set(rowData, imgRow * width * 4);
    }
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    imgData.data.set(pixels);
    ctx.putImageData(imgData, 0, 0);
    const outCanvas = Canvas.createCanvas(width / downsample, height / downsample);
    const outCtx = outCanvas.getContext("2d");
    outCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width / downsample, height / downsample);
    return outCanvas.toDataURL(imageType);
}

class Scene {
    dispose() {
        ModelUtils.removeObjectsWithChildren(this.scene);
        Object.keys(this).forEach(item => {
            item = this[item];
            try {
                item.remove();
            } catch {}
        })
        this.scene.remove();
    }

    async setPanorama(source, fixed = false) {
        if (this.panoTexture) this.panoTexture.dispose();
        this.panoTexture = await ModelUtils.createTexture(source);
        if (!fixed) this.panoTexture.mapping = THREE.EquirectangularReflectionMapping;
        this.panoTexture.needsUpdate = true;
        this.scene.background = this.panoTexture;
    }

    attachCanvas(canvas) {
        this.renderTarget = new THREE.WebGLRenderTarget(canvas.width, canvas.height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.UnsignedByteType,
        });

        this.renderer.setRenderTarget(renderTarget);
    }

    updateComposerSize() {
        this.composer.setSize(this.width, this.height);
        const pixelRatio = this.renderer.getPixelRatio();
        this.composer.setPixelRatio(pixelRatio);
        this.fxaaPass.material.uniforms["resolution"].value.x = 1 / (this.width * pixelRatio);
        this.fxaaPass.material.uniforms["resolution"].value.y = 1 / (this.height * pixelRatio);
    }

    constructor(options) {
        options.antialias = true;
        console.log("Creating scene...");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(options.fov || 75, 1, 0.1, 1000);
        this.scene.add(this.camera);
        console.log("created scene");

        

        let awaitingComponents = [];
        function checkCompletion(instance, id) {
            let index = awaitingComponents.indexOf(id);
            if (index >= 0) awaitingComponents.splice(index, 1);
            if (!awaitingComponents.length && options.readyCallback) options.readyCallback(instance);
        }

        if (options.panorama) {
            awaitingComponents.push("panorama");
            this.setPanorama(options.panorama, options.fixedPanorama).then(()=> checkCompletion(this, "panorama"));
        }
        if (options.canvas) {
            this.renderer = new THREE.WebGLRenderer({
                canvas: options.canvas,
                alpha: options.alpha || false,
                powerPreference: "high-performance",
                antialias: !!options.antialias
            });

            this.effectFXAA = null;
            if (options.antialias) {
                this.composer = new THREE.EffectComposer(this.renderer);
                this.renderPass = new THREE.RenderPass(this.scene, this.camera);
                this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
                this.composer.addPass(this.renderPass);
                this.composer.addPass(this.effectFXAA);
            }

            const downsampleFactor = options.downsample || 1;

            function updateSize(instance) {
                options.canvas.width = options.canvas.offsetWidth * downsampleFactor;
                options.canvas.height = options.canvas.offsetHeight * downsampleFactor;
                instance.renderer.setSize(options.canvas.offsetWidth * downsampleFactor, options.canvas.offsetHeight * downsampleFactor, false);
                instance.composer.setSize(options.canvas.offsetWidth, options.canvas.offsetHeight);
                if (instance.effectFXAA) {
                    let pixelRatio = instance.renderer.getPixelRatio();
                    instance.effectFXAA.material.uniforms.resolution.value.set(1 / options.canvas.offsetWidth / pixelRatio, 1 / options.canvas.offsetHeight / pixelRatio);
                }
                instance.camera.aspect = options.canvas.offsetWidth / options.canvas.offsetHeight;
                instance.camera.updateProjectionMatrix();
            }
            updateSize(this);
            if (this.effectFXAA) this.effectFXAA.renderToScreen = true;
            window.addEventListener("resize", () => updateSize(this));


            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.controls = new THREE.OrbitControls(this.camera, options.canvas);
        }
        if (!awaitingComponents.length) checkCompletion(this);
    }

    
}

export {
    drawScene,
    Scene
};