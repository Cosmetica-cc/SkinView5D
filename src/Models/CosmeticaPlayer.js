import {Player} from "./Player.js";
import * as ModelUtils from "../ModelUtils.js";

class CosmeticaPlayer {
    constructor() {
        this.player = new Player();
    }

    build(skin, options = {}) {
        return new Promise(async (resolve, reject) => {
            await this.player.build(skin, options);
            let awaitingComponents = [];

            function checkCompletion(id) {
                let index = awaitingComponents.indexOf(id);
                if (index >= 0) awaitingComponents.splice(index, 1);
                if (!awaitingComponents.length) resolve();
            }

            if (options.hat && options.hat.model && options.hat.texture) {
                awaitingComponents.push("hat");
                ModelUtils.importJsonModel(options.hat.model, options.hat.texture)
                .then(model => {
                    model.position.sub(new THREE.Vector3(8, -8, 8));
                    this.player.head.group.add(model);
                    model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
                    checkCompletion("hat");
                }).catch(e => {
                    console.log(e);
                    checkCompletion("hat");
                });
            }

            if (options.shoulderBuddy && options.shoulderBuddy.model && options.shoulderBuddy.texture) {
                awaitingComponents.push("shoulderBuddy");
                ModelUtils.importJsonModel(options.shoulderBuddy.model, options.shoulderBuddy.texture)
                .then(model => {
                    model.position.add(new THREE.Vector3(8, 2, -8));
                    model.scale.x = -1;
                    this.player.armLeft.group.add(model);
                    model.scale.add(new THREE.Vector3(0.01, 0.01, 0.01));
                    checkCompletion("shoulderBuddy");
                }).catch(e => {
                    console.log(e);
                    checkCompletion("shoulderBuddy");
                });
            }



            if (!awaitingComponents.length) checkCompletion();
        });
    }
}

export {
    CosmeticaPlayer
}