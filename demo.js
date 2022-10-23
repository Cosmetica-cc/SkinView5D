import * as Scene from "./src/Scene.js";
import * as DemoScenes from "./src/DemoScenes.js";

(async () => {
    //const image = await createScene();
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    const scene = await DemoScenes.createScene("normal", {
        canvas,
        slim: true,
        renderCallback: (scene) => {
            if (!scene.player) return;
            // scene.player.player.root.rotateY(0.01);
        }
    });
    function animate() {
        scene.player.player.animate(animations.run, 1)
        .then(() => {
            scene.player.player.animate(animations.backflip, 1)
            .then(() => {
                scene.player.player.animate(animations.barrelRoll, 1)
                .then(() => {
                    animate();
                });
            });
        });
    }
    setTimeout(animate, 1000);
    // setInterval(() => {
    //     const image = Scene.drawScene(scene.scene, scene.camera, 500, 500, "image/png", false);

    //     const element = document.createElement("img");
    //     element.src = image;
    //     document.body.appendChild(element);
    // }, 1000);
})();