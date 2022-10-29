# SkinView5D
SkinView5D is my take on a web-based interactive 3D Minecraft scene engine built for the Cosmetica website and thumbnail generator. This project isn't actually related to SkinView3D.
## Features
- Player model
- High-res skins
- High-res, animated capes,
- Java block/item model support
- Poses library
- Animation support w/ demo library
- Easily convertable to SSR
- Legacy skin support
- Extensive lighting support
- Not TypeScript (cos I'm so based)
- Automatic resizing

## Here's how to use SkinView5D
```html
<canvas id="canvas" style="width: 100%; height: 100vh"></canvas>

<script type="module">

    import { createScene } from "https://cdn.jsdelivr.net/gh/cosmetica-cc/skinview5d@1.0/src/DemoScenes.js"; // import the scene creator helper function
    import { poses } from "https://cdn.jsdelivr.net/gh/cosmetica-cc/skinview5d@1.0/poseloader.js"; // import demo poses

    const user = "eye2ah";

    fetch("https://api.cosmetica.cc/v2/get/info?user=" + user).then(r => r.json()).then(async response => { // get Cosmetica data for user. the scene creator helper uses data presented in the same format as the Cosmetica API, so this is the easiest way to do it. (Nothing stopping you from just replicating the format with your own data, or not using the scene creator helper and just creating a scene directly)
        const scene = await createScene({
            pose: poses.starjump, // from the poseloader demo library
            playerRotation: [0, 0.5, 0], // all angles are in radians (x, y, z)
            camera: [10, 5, 50], // position of camera
            cameraPostRotation: [0, 0, 0], // after camera has been positioned it will point to the player, you can then adjust this angle with cameraPostRotation
            fov: 60,
            lights: [
                {
                    type: "ambient", // "ambient" illuminates everything in the scene evenly
                    intensity: 0.4, // 
                    position: [0, 0, 0]
                },
                {
                    type: "point", // "point" illuminates like a lightbulb
                    intensity: 0.6,
                    position: "camera" // setting position to "camera" will have the light follow the camera. Only useful for "point" lights
                }
            ],
            elytraSpread: 1.5, // how far to spread elytra. 0 is closed, ~1.5 is open
            fixedPano: false // setting to false will make the background panorama ignore the camera's perspective
        },
        {
            ...response, // pipe in data from the Cosmetica api
            canvas: document.getElementById("canvas"), // specify canvas to control
            panorama: `https://cosmetica.cc/page/panoramas/${response.panorama}.jpg`, // override the "panorama" field to use an actual URL rather t han just the numeric ID of the panorama
            antialias: true, // enables FXAA
            backEquipment: "elytra", // "none" will hide all back equipment, "elytra" will show elytra, anything else will show cape
            renderCallback: scene => { // called every time scene is preparing to render a frame
                if (!scene.player) return; // stop if the player hasn't been added to the scene yet
                scene.player.player.root.rotateY(0.02); // slowly rotate the player
            }
        });
    });

</script>
```

## License
Apache 2.0