const poses = {
    "run": {
        "armLeft": [-1],
        "armRight": [1],
        "legLeft": [1],
        "legRight": [-1]
    },
    "starjump": {
        "head": [-0.2, 0.15, 0.2],
        "armLeft": [0.3, 0, 2.5],
        "armRight": [0.3, 0, -2.5],
        "legLeft": [-0.2, 0, 0.7],
        "legRight": [-0.2, 0, -0.7]
    },
    "sprint": {
        "body": [0.5],
        "head": [-0.5],
        "armLeft": [-1.7],
        "armRight": [1],
        "legLeft": [0.7],
        "legRight": [-1.3]
    },
    "flying": {
        "body": [1.2, 0, 0],
        "head": [-0.85, 0.05, 0.1],
        "armLeft": [-2.9, 0, 0],
        "armRight": [-2.7, 0, 0],
        "legLeft": [0.2, 0, 0.2],
        "legRight": [-0.1, 0, -0.3]
    },
    "standing": {
        "body": [0, 0, 0],
        "head": [0, 0, 0],
        "armLeft": [0, 0, 0],
        "armRight": [0, 0, 0],
        "legLeft": [0, 0, 0],
        "legRight": [0, 0, 0]
    }
};
const scenes = {
    "normal": {
        "pose": "run",
        "playerRotation": [0, 0.5, 0],
        "camera": [10, 5, 50],
        "cameraPostRotation": [0, 0, 0],
        "fov": 70,
        "lights": [
            {
                "type": "ambient",
                "intensity": 0.4,
                "position": [0, 0, 0]
            },
            {
                "type": "point",
                "intensity": 0.6,
                "position": "camera"
            }
        ],
        "backEquipment": "elytra",
        "elytraSpread": 1.5,
        "panorama": "./model.png",
        "fixedPano": false
    },
    "starjump": {
        "pose": "starjump",
        "playerRotation": [0, 0.5, 0],
        "camera": [0, 5, 20],
        "cameraPostRotation": [0.5, 0, -0.1],
        "fov": 50,
        "lights": [
            {
                "type": "point",
                "position": [0, 15, 15]
            }
        ],
        "backEquipment": "elytra",
        "elytraSpread": 1.5,
        "panorama": "./model.png",
        "fixedPano": false
    },
    "profile": {
        "pose": "run",
        "playerRotation": [0, 0.5, 0],
        "camera": [-5, 8, 23],
        "cameraPostRotation": [0.45, 0, 0],
        "fov": 50,
        "lights": [
            {
                "type": "point",
                "position": [-5, 15, 30]
            }
        ],
        "backEquipment": "elytra",
        "elytraSpread": 1.5,
        "panorama": null,
        "fixedPano": false
    }
};

function getScene(id) {
    if (!Object.keys(scenes).includes(id)) throw "Unknown scene: " + id;
    var out = scenes[id];
    if (!Object.keys(poses).includes(out.pose)) throw "Unknown pose: " + out.pose;
    out.pose = poses[out.pose];
    return out;
}

export {
    poses,
    scenes,
    getScene
}