import * as Scene from "./Scene.js";
import {CosmeticaPlayer} from "./Models/CosmeticaPlayer.js";

function createScene(sceneType, options = {}) {
    if (!Object.keys(scenes).includes(sceneType)) throw "Scene does not exist!";
    const sceneInfo = scenes[sceneType];
    return new Promise((resolve, reject) => {
        const skin = options.skin || "../path.png";
        let parts = {player: 1, scene: 1};
        const scene = new Scene.Scene({
            panorama: sceneInfo.panorama,
            fov: sceneInfo.fov,
            ...options,
            readyCallback: async () => {
                delete parts.scene;
                if (!Object.keys(parts).length) {
                    resolve(scene);
                }
            }
        });
        (async () => {
            try {
                console.log("making player");
                const player = new CosmeticaPlayer();
                scene.player = player;
                console.log("made player");
                await player.build("./skin.png", {
                    slim: !!options.slim,
                    hat: {  
                        model: models[1],
                        texture: "hat.png"
                    },
                    shoulderBuddy: {
                        model: models[0],
                        texture: "model.png"
                    }
                });
                console.log("built models");
                player.player.root.rotation.set(...sceneInfo.playerRotation);
                scene.scene.add(player.player.root);
                player.player.pose(sceneInfo.pose);
                sceneInfo.lights.forEach(lightInfo => {
                    let light = lightInfo.type == "point" ? new THREE.PointLight() : new THREE.AmbientLight();
                    light.position.set(...lightInfo.position);
                    light.castShadow = true;
                    scene.scene.add(light);
                })
                scene.camera.position.set(...sceneInfo.camera);
                console.log("updating camera");
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