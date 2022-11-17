import { PoseLoader, createScene, drawScene } from "./SkinView5D.js";

import Axios from "axios";

(async () => {
    Axios.get("https://api.cosmetica.cc/v2/get/info?user=eye2ah").then(async response => {
        if (response.status != 200) return console.log("Invalid response from Cosmetica!");
        response = response.data;
        delete response.panorama;
        const scene = await createScene(PoseLoader.getScene("starjump"), {
            ...response,
            backEquipment: "cape"
        });
        setTimeout(async () => {
            console.log(await drawScene(scene.scene, scene.camera, 300, 300, "image/png", false, true, 2));
        }, 1000);
    });
})();