import * as DemoScenes from "./src/DemoScenes.js";
import * as DemoPoses from "./poseloader.js";
import { animations } from "./animations.js";

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
            alpha: true,
            // panorama: `https://cosmetica.cc/page/panoramas/${response.panorama}.jpg`,
            renderCallback: (scene) => {
                if (!scene.player) return;
                scene.player.player.root.rotateY(0.001);
            }
        });
        async function animate() {
            let list = ["run", "run", "backflip", "run", "wave", "idle", "sleepy"];
            // let list = ["idle", "sleepy"];

            for (let i = 0; i < list.length; i++) {
                await scene.player.player.animate(animations[list[i]]);
            }
            animate();
        }
        setTimeout(animate, 500);
        // setTimeout(() => {
        //     console.log("disposing!");
        //     scene.dispose();
        // }, 5000);
    });
})();