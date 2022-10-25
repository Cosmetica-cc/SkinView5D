import * as THREE from "three";
import * as Scene from "./Scene.js";
import {CosmeticaPlayer} from "./Models/CosmeticaPlayer.js";

async function createScene(sceneType, options = {}) {
    var sceneInfo = sceneType;
    // if (typeof sceneType == "string") {
    //     if (!scenes.length) scenes = await getFile("../demoScenes.json", true);
    //     if (!Object.keys(scenes).includes(sceneType)) throw "Scene does not exist!";
    //     scenes[sceneType];
    // }
    return new Promise((resolve, reject) => {
        let parts = {player: 1, scene: 1};
        const scene = new Scene.Scene({
            ...options,
            fov: sceneInfo.fov,
            readyCallback: async () => {
                delete parts.scene;
                if (!Object.keys(parts).length) {
                    resolve(scene);
                }
            }
        });
        (async () => {
            try {
                const player = new CosmeticaPlayer();
                scene.player = player;
                await player.build(options);
                player.player.root.rotation.set(...sceneInfo.playerRotation);
                scene.scene.add(player.player.root);
                player.player.pose(sceneInfo.pose);
                sceneInfo.lights.forEach(lightInfo => {
                    let light = lightInfo.type == "point" ? new THREE.PointLight(0xffffff, lightInfo.intensity || 1) : new THREE.AmbientLight(0xffffff, lightInfo.intensity || 1);
                    if (lightInfo.position == "camera") {
                        light.position.set(0, 0, 0);
                        scene.camera.add(light);
                    } else {
                        light.position.set(...lightInfo.position);
                        scene.scene.add(light);
                    }
                })
                scene.camera.position.set(...sceneInfo.camera);
                scene.camera.lookAt(player.player.root.position);
                scene.camera.rotateX(sceneInfo.cameraPostRotation[0]).rotateY(sceneInfo.cameraPostRotation[1]).rotateZ(sceneInfo.cameraPostRotation[2]);
                if (scene.controls) scene.controls.update();
                delete parts.player;
                if (!Object.keys(parts).length) {
                    resolve(scene);
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })();
    });
}

export {
    createScene
}