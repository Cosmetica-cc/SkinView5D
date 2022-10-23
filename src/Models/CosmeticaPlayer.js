import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.143.0/build/three.module.js";
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
                this.player.setCape(options.cape.image);
            }

            if (!awaitingComponents.length) checkCompletion();
        });
    }
}

export {
    CosmeticaPlayer
}