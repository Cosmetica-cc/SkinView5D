// import * as DemoScenes from "https://cdn.jsdelivr.net/gh/eyezahhhh/SkinView5D/src/DemoScenes.js";
import * as DemoScenes from "skinview5d";
import * as DemoPoses from "./poseloader.js";
import Animations from "./animations.js";

(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    fetch("https://api.cosmetica.cc/v2/get/info?user=" + location.hash.substring(1)).then(r => r.json()).then(async response => {
        delete response.panorama;
        const scene = await DemoScenes.createScene(DemoPoses.getScene("normal"), {
            canvas,
            backEquipment: "cape",
            downsample: 2,
            ...response,
            // panorama: `https://cosmetica.cc/page/panoramas/${response.panorama}.jpg`,
            renderCallback: (scene) => {
                if (!scene.player) return;
                // scene.player.player.root.rotateY(0.001);
            }
        });
        async function animate() {
            let list = ["run", "run", "backflip", "run", "wave", "idle", "sleepy"];
            // let list = ["idle", "sleepy"];

            for (let i = 0; i < list.length; i++) {
                await scene.player.player.animate(Animations[list[i]]);
            }
            animate();
        }
        setTimeout(animate, 500);
    });
})();