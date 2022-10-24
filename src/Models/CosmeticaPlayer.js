import * as THREE from "three";
import {Player} from "./Player.js";
import * as ModelUtils from "../ModelUtils.js";

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

            function makeCosmeticModel(id, model, texture) {
                awaitingComponents.push(id);
                return new Promise((resolve, reject) => {
                    ModelUtils.importJsonModel(model, texture)
                    .then(model => {
                        resolve(model);
                        checkCompletion(id);
                    }).catch(e => {
                        console.log(e);
                        reject();
                        checkCompletion(id);
                    });
                });
            }

            if (options.hats) {
                let i = 0;
                options.hats.forEach(hat => {
                    if (hat.model && hat.texture) {
                        makeCosmeticModel("hat-" + ++i, hat.model, hat.texture).then(model => {
                            model.position.sub(new THREE.Vector3(-8, -8, -8));
                            this.player.head.group.add(model);
                            model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
                        });
                    }
                });
            }

            if (options.shoulderBuddies) {
                let i = 0;
                ["left", "right"].forEach(side => {
                    if (options.shoulderBuddies[side] && options.shoulderBuddies[side].model && options.shoulderBuddies[side].texture) {
                        makeCosmeticModel("shoulderbuddy-" + ++i, options.shoulderBuddies[side].model, options.shoulderBuddies[side].texture).then(model => {
                            model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
                            if (side == "left") {
                                if (options.shoulderBuddies[side].extraInfo & 1) {
                                    this.player.body.group.add(model);
                                    model.position.sub(new THREE.Vector3(-14, -5.5, -8));
                                } else {
                                    this.player.armLeft.group.add(model);
                                    model.position.sub(new THREE.Vector3(-8, -2, -8));
                                }
                            } else {
                                model.scale.x *= -1;
                                if (options.shoulderBuddies[side].extraInfo & 1) {
                                    this.player.body.group.add(model);
                                    model.position.sub(new THREE.Vector3(14, -5.5, -8));
                                } else {
                                    this.player.armRight.group.add(model);
                                    model.position.sub(new THREE.Vector3(8, -2, -8));
                                }
                            }
                        });
                    }
                });
            }

            if (options.backBling && options.backBling.model && options.backBling.texture) {
                let i = 0;
                makeCosmeticModel("backbling-" + ++i, options.backBling.model, options.backBling.texture).then(model => {
                    model.position.sub(new THREE.Vector3(-8, 0, -6));
                    this.player.body.group.add(model);
                    model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
                });
            }

            if (options.cape) {
                awaitingComponents.push("cape");
                let img = new Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    let frameHeight = width / 2;
                    if (height % frameHeight != 0) return console.log("Cape wasn't right dimensions!");
                    let frameCount = height / frameHeight;
                    let frames = [];
                    let capeCanvas = document.createElement("canvas");
                    capeCanvas.width = width;
                    capeCanvas.height = frameHeight;
                    let ctx = capeCanvas.getContext("2d");
                    for (let i = 0; i < frameCount; i++) {
                        ctx.clearRect(0, 0, width, frameHeight);
                        ctx.drawImage(img, 0, frameHeight * i, width, frameHeight, 0, 0, width, frameHeight);
                        ModelUtils.createMaterial(capeCanvas.toDataURL()).then(material => {
                            frames.push(material);
                            if (frames.length != frameCount) return;
                            this.player.setCape(frames[0]);
                            checkCompletion("cape");
                            if (!options.cape.extraInfo || frameCount.length == 1) {
                            } else {
                                let i = 0;
                                let loop = setInterval(() => {
                                    if (!frames.includes(this.player.capeMaterial)) {
                                        clearInterval(loop);
                                        console.log("Cape has been changed! stopping the animation...");
                                        return;
                                    }
                                    i++;
                                    while (i >= frameCount) i -= frameCount;
                                    this.player.setCape(frames[i]);
                                }, options.cape.extraInfo);
                            }
                        });
                    }
                }
                img.src = options.cape.image;
            }

            if (!awaitingComponents.length) checkCompletion();
        });
    }
}

export {
    CosmeticaPlayer
}