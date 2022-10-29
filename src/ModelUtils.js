import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";

function createGrouplessBox(xD, yD, zD, material, pX = 0, pY = 0, pZ = 0) {
    const geometry = new THREE.BoxGeometry(xD, yD, zD);
    const box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    box.position.set(pX, pY, pZ);
    return box;
}

function createBox(xD, yD, zD, material, oX = 0, oY = 0, oZ = 0, pX, pY, pZ) {
    const box = createGrouplessBox(xD, yD, zD, material, pX, pY, pZ);
    const group = new THREE.Group();
    group.position.set(oX, oY, oZ);
    group.add(box);
    return {box, group}; 
}

function rotateArray(arr, shift) {
	let original = [...arr];

	for (let i = 0; i < arr.length; ++i) {
		arr[i] = original[(i + shift) % arr.length];
	}

	return arr;
}

function setJsonUVs(box, faceUVs) {
    function toFaceVertices(face) {
        if (face == undefined) {
			return [
				new THREE.Vector2(-1.0, -1.0),
				new THREE.Vector2(0.0, -1.0),
				new THREE.Vector2(0.0 / 16, 0.0),
				new THREE.Vector2(-1.0, 0.0)
			];
		} else {
			let result = [
				new THREE.Vector2(face.uv[0] / 16, 1.0 - face.uv[3] / 16),
				new THREE.Vector2(face.uv[2] / 16, 1.0 - face.uv[3] / 16),
				new THREE.Vector2(face.uv[2] / 16, 1.0 - face.uv[1] / 16),
				new THREE.Vector2(face.uv[0] / 16, 1.0 - face.uv[1] / 16)
			];
			if (face.rotation == undefined) face.rotation = 0;
			result = rotateArray(result, Math.floor(face.rotation / 90));
			return result;
		}
    }
    let nth = toFaceVertices(faceUVs.north);
	let est = toFaceVertices(faceUVs.east);
	let sth = toFaceVertices(faceUVs.south);
	let wst = toFaceVertices(faceUVs.west);
	let up = toFaceVertices(faceUVs.up);
	let down = toFaceVertices(faceUVs.down);

	const uvAttr = box.attributes.uv;
	uvAttr.copyVector2sArray([
		est[3], est[2], est[0], est[1],
		wst[3], wst[2], wst[0], wst[1],
		up[3], up[2], up[0], up[1],
		down[3], down[2], down[0], down[1],
		sth[3], sth[2], sth[0], sth[1],
		nth[3], nth[2], nth[0], nth[1]
	]);
	uvAttr.needsUpdate = true;
}

async function importJsonModel(model, texture) {
    try {
        if (typeof model == "string") model = JSON.parse(model);
        const material = await createMaterial(texture);
        var group = new THREE.Group();
        model.elements.forEach(element => {
            let xDif = element.to[0] - element.from[0];
			let yDif = element.to[1] - element.from[1];
			let zDif = element.to[2] - element.from[2];
			let xPos = element.from[0];
			let yPos = element.from[1];
			let zPos = element.from[2];

            let box = new THREE.BoxGeometry(Math.abs(xDif), Math.abs(yDif), Math.abs(zDif));
            box.translate(xDif / 2 + xPos, yDif / 2 + yPos, zDif / 2 + zPos);
            setJsonUVs(box, element.faces);

            let mesh = new THREE.Mesh(box, material);

            if (element.rotation != undefined && element.rotation.angle % 360 != 0) {
                let angle = element.rotation.angle * Math.PI / 180;
                let axis = new THREE.Vector3(0, 0, 0);

                const axisNames = ["x", "y", "z"];
                axisNames.every(axisTest => {
                    if (axisTest == element.rotation.axis) {
                        let vectorCoords = Array(3).fill(0);
                        vectorCoords[axisNames.indexOf(axisTest)] = 1;
                        axis = new THREE.Vector3(...vectorCoords);
                        return;
                    }
                    return true;
                });
                mesh.position.sub(new THREE.Vector3(...element.rotation.origin));
                mesh.position.applyAxisAngle(axis, angle);
                mesh.position.add(new THREE.Vector3(...element.rotation.origin));
                mesh.rotateOnAxis(axis, angle);
            }
            group.add(mesh);
        });
        group.scale.x = -1;
        group.scale.z = -1;
        return group;
    } catch (e) {
        console.log(e);
        throw "JSON model is not a valid format!";
    }
}

function toFaceVertices(textureWidth, textureHeight, x1, y1, x2, y2) {
    return [
        new THREE.Vector2(x1 / textureWidth, 1.0 - y2 / textureHeight),
		new THREE.Vector2(x2 / textureWidth, 1.0 - y2 / textureHeight),
		new THREE.Vector2(x2 / textureWidth, 1.0 - y1 / textureHeight),
		new THREE.Vector2(x1 / textureWidth, 1.0 - y1 / textureHeight)
    ];
}

function setUVs(box, u, v, width, height, depth, textureWidth, textureHeight) {
    const top = toFaceVertices(textureWidth, textureHeight, u + depth, v, u + width + depth, v + depth);
	const bottom = toFaceVertices(textureWidth, textureHeight, u + width + depth, v, u + width * 2 + depth, v + depth);
	const left = toFaceVertices(textureWidth, textureHeight, u, v + depth, u + depth, v + depth + height);
	const front = toFaceVertices(textureWidth, textureHeight, u + depth, v + depth, u + width + depth, v + depth + height);
	const right = toFaceVertices(textureWidth, textureHeight, u + width + depth, v + depth, u + width + depth * 2, v + height + depth);
	const back = toFaceVertices(textureWidth, textureHeight, u + width + depth * 2, v + depth, u + width * 2 + depth * 2, v + height + depth);

    const uvAttributes = box.attributes.uv;
    uvAttributes.copyVector2sArray([
		right[3], right[2], right[0], right[1],
		left[3], left[2], left[0], left[1],
		top[3], top[2], top[0], top[1],
		bottom[0], bottom[1], bottom[3], bottom[2],
		front[3], front[2], front[0], front[1],
		back[3], back[2], back[0], back[1]
	]);
	uvAttributes.needsUpdate = true;
}

function convertSkin(image) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx =  canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 64, 32);
        ctx.drawImage(image, 0, 16, 16, 16, 16, 48, 16, 16);
        ctx.drawImage(image, 40, 16, 16, 16, 32, 48, 16, 16);
        ctx.clearRect(0, 0, 8, 8);
        ctx.clearRect(24, 0, 8, 8);
        ctx.clearRect(32, 0, 32, 16);
        const out = new Image();
        out.onload = () => resolve(out);
        out.onerror = e => {
            console.log(e);
            reject();
        }
        out.src = canvas.toDataURL();
    });
}

function createTexture(source, isSkin) {
    return new Promise((resolve, reject) => {
        try {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = async () => {
                if (isSkin && image.height * 2 == image.width) image = await convertSkin(image);
                let imageCanvas = document.createElement("canvas");
                imageCanvas.width = image.width;
                imageCanvas.height = image.height;
                imageCanvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
                let texture = new THREE.CanvasTexture(imageCanvas);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.minFilter = THREE.NearestFilter;
                texture.magFilter = THREE.NearestFilter;
                resolve(texture);
            }
            image.onerror = e => {
                console.log(e);
                reject("The requested file does not exist! " + source);
            }
            image.src = source;
        } catch (e) {
            reject(e);
        }
    });
}

async function createMaterial(source, opaque = false, alphaTest = 0.35, isSkin = false) {
    if (source.isMaterial) return source;
    return new THREE.MeshStandardMaterial({
        map: await createTexture(source, isSkin),
        side: THREE.DoubleSide,
        transparent: !opaque,
        alphaTest
    });
}

function lerp(start, end, duration, callback) {
    if (start == end) return callback(end, true);
    const max = Math.max(start, end);
    const min = Math.min(start, end);
    const delta = end - start;
    const startTime = (new Date()).getTime();
    function animate() {
        let value = Math.min(max, Math.max(min, start + delta * (new Date().getTime() - startTime) / duration / 1000));
        if (value != end) requestAnimationFrame(animate);
        callback(value, value == end);
    }
    animate();
}

function removeObjectsWithChildren(obj){
    if(obj.children.length > 0){
        for (var x = obj.children.length - 1; x>=0; x--){
            removeObjectsWithChildren(obj.children[x]);
        }
    }
    if (obj.geometry) {
        obj.geometry.dispose();
    }
    if (obj.material) {
        if (obj.material.length) {
            for (let i = 0; i < obj.material.length; ++i) {
                if (obj.material[i].map) obj.material[i].map.dispose();
                if (obj.material[i].lightMap) obj.material[i].lightMap.dispose();
                if (obj.material[i].bumpMap) obj.material[i].bumpMap.dispose();
                if (obj.material[i].normalMap) obj.material[i].normalMap.dispose();
                if (obj.material[i].specularMap) obj.material[i].specularMap.dispose();
                if (obj.material[i].envMap) obj.material[i].envMap.dispose();
                obj.material[i].dispose();
            }
        } else {
            if (obj.material.map) obj.material.map.dispose();
            if (obj.material.lightMap) obj.material.lightMap.dispose();
            if (obj.material.bumpMap) obj.material.bumpMap.dispose();
            if (obj.material.normalMap) obj.material.normalMap.dispose();
            if (obj.material.specularMap) obj.material.specularMap.dispose();
            if (obj.material.envMap) obj.material.envMap.dispose();
            obj.material.dispose();
        }
    }
    obj.removeFromParent();
    return true;
}

export {
    createBox,
    toFaceVertices,
    setUVs,
    createMaterial,
    createGrouplessBox,
    createTexture,
    importJsonModel,
    lerp,
    removeObjectsWithChildren
}