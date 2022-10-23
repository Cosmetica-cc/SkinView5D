import * as THREE from "three";
import * as ModelUtils from "../ModelUtils.js";

class Player {
    constructor() {
        this.bodyPartNames = ["body", "head", "armLeft", "armRight", "legLeft", "legRight"];
        this.groupOffsets = {
            body: () => [0, 0, 0],
            head: () => [0, 6, 0],
            armLeft: () => [5 - 0.5 * this.slim, 4, 0],
            armRight: () => [0.5 * this.slim - 5, 4, 0],
            legLeft: () => [2, -6, 0],
            legRight: () => [-2, -6, 0]
        };
        this.root = new THREE.Group();
        this.slim = false;
    }

    async build(skinTexture, options = {}) {
        if (options.slim != undefined) this.slim = !!options.slim;
        const armWidth = 4 - this.slim;
        this.skinTexture = await ModelUtils.createMaterial(skinTexture);

        this.body = ModelUtils.createBox(8, 12, 4, this.skinTexture, ...this.groupOffsets.body());
        ModelUtils.setUVs(this.body.box.geometry, 16, 16, 8, 12, 4, 64, 64);
        this.jacket = ModelUtils.createGrouplessBox(8.5, 12.5, 4.5, this.skinTexture);
        ModelUtils.setUVs(this.jacket.geometry, 16, 32, 8, 12, 4, 64, 64);
        this.body.group.add(this.jacket);
        

        this.head = ModelUtils.createBox(8, 8, 8, this.skinTexture, ...this.groupOffsets.head(), 0, 4, 0);
        ModelUtils.setUVs(this.head.box.geometry, 0, 0, 8, 8, 8, 64, 64);
        this.hat = ModelUtils.createGrouplessBox(9, 9, 9, this.skinTexture, 0, 4, 0);
        ModelUtils.setUVs(this.hat.geometry, 32, 0, 8, 8, 8, 64, 64);
        this.head.group.add(this.hat);
        this.body.group.add(this.head.group);

        this.armLeft = ModelUtils.createBox(armWidth, 12, 4, this.skinTexture, ...this.groupOffsets.armLeft(), 1, -4, 0);
        ModelUtils.setUVs(this.armLeft.box.geometry, 32, 48, armWidth, 12, 4, 64, 64);
        this.sleeveLeft = ModelUtils.createGrouplessBox(armWidth + 0.5, 12.5, 4.5, this.skinTexture, 1, -4, 0);
        ModelUtils.setUVs(this.sleeveLeft.geometry, 48, 48, armWidth, 12, 4, 64, 64);
        this.armLeft.group.add(this.sleeveLeft);
        this.body.group.add(this.armLeft.group);

        this.armRight = ModelUtils.createBox(armWidth, 12, 4, this.skinTexture, ...this.groupOffsets.armRight(), -1, -4, 0);
        ModelUtils.setUVs(this.armRight.box.geometry, 40, 16, armWidth, 12, 4, 64, 64);
        this.sleeveRight = ModelUtils.createGrouplessBox(armWidth + 0.5, 12.5, 4.5, this.skinTexture, -1, -4, 0);
        ModelUtils.setUVs(this.sleeveRight.geometry, 40, 32, armWidth, 12, 4, 64, 64);
        this.armRight.group.add(this.sleeveRight);
        this.body.group.add(this.armRight.group);

        this.legLeft = ModelUtils.createBox(4, 12, 4, this.skinTexture, ...this.groupOffsets.legLeft(), 0, -6, 0);
        ModelUtils.setUVs(this.legLeft.box.geometry, 16, 48, 4, 12, 4, 64, 64);
        this.pantsLeft = ModelUtils.createGrouplessBox(4.5, 12.5, 4.5, this.skinTexture, 0, -6, 0);
        ModelUtils.setUVs(this.pantsLeft.geometry, 0, 48, 4, 12, 4, 64, 64);
        this.legLeft.group.add(this.pantsLeft);
        this.body.group.add(this.legLeft.group);

        this.legRight = ModelUtils.createBox(4, 12, 4, this.skinTexture, ...this.groupOffsets.legRight(), 0, -6, 0);
        ModelUtils.setUVs(this.legRight.box.geometry, 0, 16, 4, 12, 4, 64, 64);
        this.pantsRight = ModelUtils.createGrouplessBox(4.5, 12.5, 4.5, this.skinTexture, 0, -6, 0);
        ModelUtils.setUVs(this.pantsRight.geometry, 0, 32, 4, 12, 4, 64, 64);
        this.legRight.group.add(this.pantsRight);
        this.body.group.add(this.legRight.group);

        this.root.add(this.body.group);
    }

    async setCape(capeTexture) {
        this.capeTexture = await ModelUtils.createMaterial(capeTexture);
        this.cape = ModelUtils.createBox(10, 16, 1, this.capeTexture, 0, 6, -3, 0, -8, 0);
        ModelUtils.setUVs(this.cape.box.geometry, 0, 0, 10, 16, 1, 64, 32);
        this.cape.group.rotateX(0.5);
        this.body.group.add(this.cape.group);
    }

    updateElytraSpread(angle) {
        //this.elytraWingLeft.group.rotation.x = angle;
        this.elytraWingLeft.group.rotation.z = angle;
        
        //this.elytraWingRight.group.rotation.x = angle;
        this.elytraWingRight.group.rotation.z = -angle;
    }

    async setElytra(elytraTexture) {
        this.elytraTexture = await ModelUtils.createMaterial(elytraTexture);

        this.elytraWingLeft = ModelUtils.createBox(12, 22, 4, this.elytraTexture, 5, 5, -2, -5, -10, -1);
        ModelUtils.setUVs(this.elytraWingLeft.box.geometry, 22, 0, 10, 20, 2, 64, 32);
        this.elytraWingLeft.group.rotation.y = 0.1;

        this.elytraWingRight = ModelUtils.createBox(12, 22, 4, this.elytraTexture, -5, 5, -2, 5, -10, -1);
        ModelUtils.setUVs(this.elytraWingRight.box.geometry, 22, 0, 10, 20, 2, 64, 32);
        this.elytraWingRight.group.rotation.y = -0.1;
        this.elytraWingRight.box.scale.x = -1;

        this.elytra = new THREE.Group();
        this.elytra.add(this.elytraWingLeft.group);
        this.elytra.add(this.elytraWingRight.group);

        this.updateElytraSpread(0.2617994);

        this.body.group.add(this.elytra);
    }

    pose(pose) {
        if (typeof pose == "string" && Object.keys(poses).includes(pose)) pose = poses[pose];
        this.bodyPartNames.forEach(part => {
            if (!pose[part] || !Array.isArray(pose[part])) return;
            const axis = ["x", "y", "z"];
            for (let i = 0; i < 3; i++) {
                let value = pose[part].length > i && typeof pose[part][i] == "number" ? pose[part][i] : 0;
                this[part].group.rotation[axis[i]] = value;
            }
        });
    }

    animate(animation, speed = 1) {
        return new Promise((resolve, reject) => {
            const axisNames = ["x", "y", "z"];
            var stepCount = 0;
            var finished = false;
            animation.forEach(step => {
                let times = step.time;
                if (typeof times == "number") times = [times];
                times.forEach(time => {
                    this.bodyPartNames.forEach(bodyPart => {
                        if (!Object.keys(step).includes(bodyPart)) return;
                        stepCount++;
                        let partInfo = step[bodyPart];
                        setTimeout(() => {
                            stepCount--;
                            if (!stepCount && !finished) {
                                finished = true;
                                console.log("animation has finished!");
                                this.bodyPartNames.forEach(bodyPart => {
                                    console.log(this[bodyPart].group.rotation.x % (Math.PI * 2), this[bodyPart].group.rotation.y % (Math.PI * 2), this[bodyPart].group.rotation.z % (Math.PI * 2));
                                    this[bodyPart].group.rotation.x = this[bodyPart].group.rotation.x % (Math.PI * 2);
                                    this[bodyPart].group.rotation.y = this[bodyPart].group.rotation.y % (Math.PI * 2);
                                    this[bodyPart].group.rotation.z = this[bodyPart].group.rotation.z % (Math.PI * 2);
                                });
                                setTimeout(resolve, 10);
                            }
                        }, ((partInfo.duration || 0.1) + time) * 1000 / speed);
                        setTimeout(() => {
                            axisNames.forEach(axis => {
                                if (partInfo[axis] == undefined || partInfo[axis] == null) return;
                                ModelUtils.lerp(this[bodyPart].group.rotation[axis], partInfo[axis], (partInfo.duration || 0.1) / speed, value => {
                                    if (!finished) this[bodyPart].group.rotation[axis] = value;
                                });
                            });
                            let partOffsets = this.groupOffsets[bodyPart]();
                            axisNames.forEach(axis => {
                                let axisField = axis + "p";
                                let offset = partOffsets[axisNames.indexOf(axis)];
                                if (partInfo[axisField] == undefined || partInfo[axisField] == null) return;
                                ModelUtils.lerp(this[bodyPart].group.position[axis], partInfo[axisField] + offset, (partInfo.duration || 0.1) / speed, value => {
                                    if (!finished) this[bodyPart].group.position[axis] = value;
                                });
                            });
                        }, (time * 1000) / speed);
                    });
                });
            });
        })
    }
}

export {
    Player
};