import * as THREE from "../Three.module.js";
import {Player} from "./Player.js";
import * as ModelUtils from "../ModelUtils.js";

import Canvas from "canvas";

function createCosmetic(type, data, player) {
    return new Promise((resolve, reject) => {
        ModelUtils.importJsonModel(data.model, data.texture)
        .then(model => {
            model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
            switch (type) {
                case "hat":
                    if (data.extraInfo & 2) {
                        model.position.sub(new THREE.Vector3(-8, -14, -8));
                        player.body.group.add(model);
                    } else {
                        model.position.sub(new THREE.Vector3(-8, -8, -8));
                        player.head.group.add(model);
                    }
                    resolve(model);
                    break;
                case "shoulderBuddyLeft":
                    if (data.extraInfo & 1) {
                        player.body.group.add(model);
                        model.position.sub(new THREE.Vector3(-14, -5.5, -8));
                    } else {
                        player.armLeft.group.add(model);
                        model.position.sub(new THREE.Vector3(-8 - 0.5 * player.slim, -2, -8));
                    }
                    resolve(model);
                    break;
                case "shoulderBuddyRight":
                    let inverse = !(data.extraInfo & 2);
                    if (inverse) model.scale.x *= -1;
                    if (data.extraInfo & 1) {
                        player.body.group.add(model);
                        model.position.sub(new THREE.Vector3(inverse ? 14 : -2, -5.5, -8));
                    } else {
                        player.armRight.group.add(model);
                        model.position.sub(new THREE.Vector3((inverse ? 1 : -1) * (8 + 0.5 * player.slim), -2, -8));
                    }
                    resolve(model);
                    break;
                case "backBling":
                    model.position.sub(new THREE.Vector3(-8, 0, -6));
                    player.body.group.add(model);
                    resolve(model);
                    break;
                default:
                    reject(`Cosmetic type ${type} is unknown!`);
            }
        }).catch(e => {
            console.log(e);
            reject(e);
        })
    });
}

class CosmeticaPlayer {
    constructor() {
        this.player = new Player();
    }

    build(options = {}) {
        return new Promise(async (resolve, reject) => {
            await this.player.build(options.skin, options);
            let awaitingComponents = [];

            function checkCompletion(id) {
                let index = awaitingComponents.indexOf(id);
                if (index >= 0) awaitingComponents.splice(index, 1);
                if (!awaitingComponents.length) resolve();
            }

            if (options.hats) {
                let i = 0;
                options.hats.forEach(hat => {
                    if (hat.model && hat.texture) {
                        let id = ++i;
                        awaitingComponents.push("hat-" + id);
                        createCosmetic("hat", hat, this.player).then(() => checkCompletion("hat-" + id));
                    }
                });
            }

            if (options.shoulderBuddies) {
                ["left", "right"].forEach(side => {
                    if (options.shoulderBuddies[side] && options.shoulderBuddies[side].model && options.shoulderBuddies[side].texture) {
                        awaitingComponents.push("shoulderbuddy-" + side);
                        createCosmetic("shoulderBuddy" + side.slice(0, 1).toUpperCase() + side.slice(1), options.shoulderBuddies[side], this.player).then(() => checkCompletion("shoulderbuddy-" + side));
                    }
                });
            }
            if (options.backBling && options.backBling.model && options.backBling.texture && (!options.cape || !!(options.backBling.extraInfo & 2))) {
                awaitingComponents.push("backbling");
                createCosmetic("backBling", options.backBling, this.player).then(() => checkCompletion("backbling"));
            }

            this.capeSpeed = null;

            if (options.cape) {
                awaitingComponents.push("cape");
                let img = new Canvas.Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    let frameHeight = width / 2;
                    if (height % frameHeight != 0) return console.log("Cape wasn't right dimensions!");
                    let capeCanvas = Canvas.createCanvas(width, frameHeight);
                    let ctx = capeCanvas.getContext("2d");
                    ctx.clearRect(0, 0, width, frameHeight);
                    ctx.drawImage(img, 0, 0, width, frameHeight, 0, 0, width, frameHeight);
                    ModelUtils.createMaterial(capeCanvas.toDataURL()).then(material => {
                        this.player.setCape(material);
                        checkCompletion("cape");
                    });
                }
                img.src = options.cape.image;
            }

            if (!awaitingComponents.length) checkCompletion();
        });
    }
}

export {
    CosmeticaPlayer,
    createCosmetic
}