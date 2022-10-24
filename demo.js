import * as DemoScenes from "./src/DemoScenes.js";

(async () => {
    //const image = await createScene();
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    fetch("https://api.cosmetica.cc/v2/get/info?user=" + location.hash.substring(1)).then(r => r.json()).then(async response => {
        const scene = await DemoScenes.createScene("normal", {
            canvas,
            backEquipment: "cape",
            ...response,
            panorama: `https://cosmetica.cc/page/panoramas/${response.panorama}.jpg`,
            renderCallback: (scene) => {
                if (!scene.player) return;
                // scene.player.player.root.rotateY(0.001);
            }
        });
        async function animate() {
            let list = ["run", "run", "backflip", "run", "wave", "idle", "sleepy"];
            // let list = ["idle", "sleepy"];

            for (let i = 0; i < list.length; i++) {
                await scene.player.player.animate(animations[list[i]]);
            }
            animate();


            //scene.player.player.animate(animations.sleepy, 1)
            // while (step >= 4) step -= 4;
            // let animation = ++step == 3 ? animations.sleepy : animations.idle;
            // // // scene.player.player.pose("standing");
            // // // setTimeout(() => {
            // // //     scene.player.player.animate(animations.defaultDance)
            // // //     .then(animate);
            // // // }, 50);
            // scene.player.player.animate(animation, 1).then(() => animate(step));
            // .then(() => {
            //     scene.player.player.animate(animations.backflip, 1).then(animate)
            //     // .then(() => {
            //     //     scene.player.player.animate(animations.barrelRoll, 1.3).then(animate);
            //     // });
            // });
        }
        setTimeout(animate, 500);
    });
    // setInterval(() => {
    //     const image = Scene.drawScene(scene.scene, scene.camera, 500, 500, "image/png", false);

    //     const element = document.createElement("img");
    //     element.src = image;
    //     document.body.appendChild(element);
    // }, 1000);
})();