const animations = {
    idle: [
        {
            time: 0,
            cape: {
                rotation: 0,
                duration: 0.3
            },
            body: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                zp: 0,
                duration: 0.1,
            },
            head: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.2,
            },
            armLeft: {
                x: 0,
                y: 0,
                duration: 0.1,
            },
            armRight: {
                x: 0,
                y: 0,
                duration: 0.1,
            },
            legLeft: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.2,
            },
            legRight: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.2,
            }
        },
        {
            time: [0.2, 3.8],
            armLeft: {
                yp: 0.5,
                z: 0.15,
                duration: 1.8
            },
            armRight: {
                yp: 0.5,
                z: -0.15,
                duration: 1.8
            },
            head: {
                x: 0,
                duration: 1.5
            }
        },
        {
            time: [0, 2, 5.6],
            armLeft: {
                z: 0.05,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 1.8,
            },
            armRight: {
                z: -0.05,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 1.8,
            },
            head: {
                x: 0.05,
                duration: 1.5
            }
        }
    ],


    sleepy: [
        {
            time: 0,
            cape: {
                rotation: 0,
                duration: 0.3
            },
            head: {
                x: 0.4,
                duration: 1
            },
            armLeft: {
                yp: -1,
                z: 0.1,
                duration: 1,
            },
            armRight: {
                yp: -1,
                z: -0.1,
                duration: 1
            }
        },
        {
            time: 1,
            armLeft: {
                z: 0,
                xp: 0,
                zp: 0,
                yp: -3,
                duration: 1.6
            },
            armRight: {
                z: 0,
                xp: 0,
                zp: 0,
                yp: -3,
                duration: 1.6
            }
        },
        {
            time: 1,
            body: {
                x: 0.3,
                y: 0,
                z: 0,
                xp: 0,
                yp: -0.5,
                zp: 0,
                duration: 0.7,
            },
            head: {
                x: 1,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.7,
            },
            armLeft: {
                x: -0.6,
                y: -0.7,
                duration: 1.7,
            },
            armRight: {
                x: -0.6,
                y: 0.7,
                duration: 1.7,
            },
            legLeft: {
                x: -0.4,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.7,
            },
            legRight: {
                x: -0.4,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.7,
            }
        },
        {
            time: 1.7,
            body: {
                x: 0.5,
                yp: -1,
                duration: 1
            },
            legLeft: {
                x: -0.6,
                duration: 1
            },
            legRight: {
                x: -0.6,
                duration: 1
            }
        },
        {
            time: [3.5, 7.5, 11.5],
            body: {
                x: 0.4,
                yp: -0.7,
                duration: 1.5
            },
            armLeft: {
                x: -0.4,
                yp: -2,
                duration: 2
            },
            armRight: {
                x: -0.4,
                yp: -2,
                duration: 2
            },
            legLeft: {
                x: -0.5,
                duration: 2
            },
            legRight: {
                x: -0.5,
                duration: 2
            },
            head: {
                x: 0.9,
                duration: 2
            }
        },
        {
            time: [5.5, 9.5],
            body: {
                x: 0.5,
                yp: -1,
                duration: 2
            },
            legLeft: {
                x: -0.6,
                duration: 2
            },
            legRight: {
                x: -0.6,
                duration: 2
            },
            armLeft: {
                x: -0.6,
                yp: -3,
                duration: 2
            },
            armRight: {
                x: -0.6,
                yp: -3,
                duration: 2
            },
            head: {
                x: 1.1,
                duration: 2
            }
        },
        {
            time: 14.5,
            cape: {
                rotation: 1,
                duration: 0.1
            },
            body: {
                x: 1.6,
                yp: -16,
                duration: 0.1
            },
            head: {
                x: 0,
                duration: 0.1
            },
            legLeft: {
                x: 0,
                z: 0.4,
                duration: 0.1
            },
            legRight: {
                x: 0,
                z: -0.4,
                duration: 0.1
            },
            armLeft: {
                x: 0,
                y: 0,
                z: 1,
                yp: 0,
                duration: 0.1
            },
            armRight: {
                x: 0,
                y: 0,
                z: -1,
                yp: 0,
                duration: 0.1
            }
        },
        {
            time: 14.7,
            cape: {
                rotation: 0,
                duration: 0.5
            }
        },
        {
            time: 18,
            armLeft: {
                z: 2,
                duration: 0.2
            },
            armRight: {
                z: -2,
                duration: 0.2
            }
        },
        {
            time: 18.5,
            body: {
                x: -0.5,
                duration: 0.5
            },
            cape: {
                rotation: 0.4,
                duration: 0.2
            }
        },
        {
            time: 18.5,
            armLeft: {
                x: -1.5,
                z: 0,
                duration: 0.1
            },
            armRight: {
                x: -1.5,
                z: 0,
                duration: 0.1
            },
            body: {
                yp: 10,
                duration: 0.3
            },
            legLeft: {
                z: 0,
                x: 0.5,
                duration: 0.3
            },
            legRight: {
                z: 0,
                x: -1,
                duration: 0.3
            }
        },
        {
            time: 18.6,
            armLeft: {
                z: 2,
                duration: 0.2
            },
            armRight: {
                x: -3.8,
                z: -1,
                duration: 0.2
            }
        },
        {
            time: 18.8,
            body: {
                yp: -1,
                duration: 0.2
            }
        },
        {
            time: 18.9,
            legLeft: {
                x: 0,
                duration: 0.2
            },
            legRight: {
                x: 0,
                duration: 0.2
            },
            cape: {
                rotation: 0,
                duration: 0.1
            }
        },
        {
            time: 19,
            body: {
                x: 0,
                yp: 0,
                duration: 0.2
            },
            armLeft: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.2
            },
            armRight: {
                x: 0,
                y: 0,
                z: 0,
                xp: 0,
                yp: 0,
                zp: 0,
                duration: 0.2
            }
        }
    ],


    wave: [
        {
            time: 0,
            cape: {
                rotation: 0,
                duration: 0.3
            },
            armLeft: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.2
            },
            armRight: {
                x: 0,
                y: 0,
                z: -2.7,
                duration: 0.2
            },
            head: {
                x: 0,
                y: 0,
                z: -0.2,
                duration: 0.2
            },
            legLeft: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.1
            },
            legRight: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.1
            },
            body: {
                x: 0,
                y: 0,
                z: 0,
                yp: 0,
                xp: 0,
                zp: 0
            }
        },
        {
            time: 0.2,
            armRight: {
                z: -1.8,
                duration: 0.2
            },
            head: {
                z: -0.1,
                duration: 0.2
            }
        },
        {
            time: 0.4,
            armRight: {
                z: -2.7,
                duration: 0.2
            },
            head: {
                z: -0.2,
                duration: 0.2
            }
        },
        {
            time: 0.6,
            armRight: {
                z: 0,
                duration: 0.3
            },
            head: {
                z: 0,
                duration: 0.3
            }
        }
    ],


    run: [
        {
            time: 0,
            cape: {
                type: "cape",
                rotation: 1,
                duration: 0.5
            }
        },
        {
            time: [0, 0.5],
            armLeft: {
                x: 1.3,
                y: 0,
                z: 0,
                duration: 0.25
            },
            armRight: {
                x: -1.8,
                y: 0,
                z: 0,
                duration: 0.25
            },
            head: {
                x: -0.3,
                y: 0,
                z: -0.1,
                duration: 0.25
            },
            legLeft: {
                x: -1.8,
                y: 0,
                z: 0,
                duration: 0.25
            },
            legRight: {
                x: 1,
                y: 0,
                z: 0,
                duration: 0.25
            },
            body: {
                x: 0.4,
                y: 0,
                z: 0,
                yp: 0,
                duration: 0.125
            }
        },
        {
            time: [0.25, 0.75],
            armLeft: {
                x: -1.8,
                duration: 0.25
            },
            armRight: {
                x: 1.3,
                duration: 0.25
            },
            head: {
                z: 0.1,
                duration: 0.25
            },
            legLeft: {
                x: 1,
                duration: 0.25
            },
            legRight: {
                x: -1.8,
                duration: 0.25
            },
            body: {
                x: 0.4,
                yp: 0,
                duration: 0.125
            }
        },
        {
            time: [0.125, 0.375, 0.625, 0.875],
            body: {
                x: 0.1,
                yp: 2.5,
                duration: 0.125
            }
        }
    ],


    backflip: [
        {
            time: 0,
            cape: {
                type: "elytra",
                spread: 1,
                duration: 0.5
            },
            armLeft: {
                x: 0.5,
                y: 0,
                z: 0,
                duration: 0.1
            },
            armRight: {
                x: 0.6,
                y: 0,
                z: 0,
                duration: 0.1
            },
            head: {
                x: 0.3,
                y: 0,
                z: 0,
                duration: 0.2
            },
            legLeft: {
                x: -0.8,
                y: 0,
                z: 0,
                duration: 0.2
            },
            legRight: {
                x: -0.8,
                y: 0,
                z: 0,
                duration: 0.25
            },
            body: {
                x: 0.3,
                y: 0,
                z: 0,
                yp: -2,
                duration: 0.2
            }
        },
        {
            time: 0.1,
            armLeft: {
                x: -2.4,
                duration: 0.3
            },
            armRight: {
                x: -2.6,
                duration: 0.4
            },
            head: {
                z: 0,
                duration: 0.2
            }
        },
        {
            time: 0.2,
            cape: {
                rotation: 1,
                duration: 0.3
            },
            body: {
                x: -6.5,
                duration: 0.6
            },
            head: {
                x: -0.7,
                duration: 0.2
            },
            legLeft: {
                x: 1,
                duration: 0.3
            },
            legRight: {
                x: 1,
                duration: 0.4
            }
        },
        {
            time: 0.2,
            body: {
                yp: 15,
                duration: 0.2
            }
        },
        {
            time: 0.6,
            legLeft: {
                x: 0.2,
                duration: 0.2
            },
            legRight: {
                x: 0.1,
                duration: 0.1
            },
            head: {
                x: 0,
                duration: 0.3
            },
            body: {
                yp: 0,
                duration: 0.2
            },
            cape: {
                spread: 0.1,
                rotation: 0,
                duration: 0.3
            }
        },
        {
            time: 0.8,
            armLeft: {
                x: 0,
                duration: 0.1
            },
            armRight: {
                x: 0,
                duration: 0.1
            },
            legLeft: {
                x: 0,
                duration: 0.1
            },
            legRight: {
                x: 0,
                duration: 0.1
            },
            body: {
                x: -6.3,
                duration: 0.1
            },
            head: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.1
            }
        }
    ],


    barrelRoll: [
        {
            time: 0,
            body: {
                y: 1.5,
                x: 0.5,
                yp: -2,
                duration: 0.1
            },
            legLeft: {
                x: -0.7,
                z: 0.4,
                duration: 0.1
            },
            legRight: {
                x: -0.7,
                z: -0.5,
                duration: 0.1
            }
        },
        {
            time: 0.1,
            body: {
                z: 0.5,
                yp: -3,
                duration: 0.1
            },
            legRight: {
                x: 0,
                duration: 0.1
            },
            legLeft: {
                x: 0,
                duration: 0.1
            },
            armRight: {
                x: 0,
                z: -2.5,
                duration: 0.1
            },
            armLeft: {
                x: 0,
                z: 0.3,
                duration: 0.1
            },
            head: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.1
            }
        },
        {
            time: 0.2,
            body: {
                z: 6.3,
                x: 0,
                duration: 0.8
            },
            armRight: {
                z: 0,
                duration: 0.5
            },
            armLeft: {
                z: 1.5,
                duration: 0.5
            },
            legLeft: {
                z: 0.7,
                duration: 0.7
            },
            legRight: {
                z: -0.2,
                x: -0.2,
                duration: 0.7
            }
        },
        {
            time: 0.2,
            body: {
                yp: 15,
                duration: 0.4
            }
        },
        {
            time: 0.6,
            armLeft: {
                z: 0,
                x: -1,
                duration: 0.4
            },
            armRight: {
                x: 1,
                duration: 0.4
            },
            body: {
                yp: 0,
                duration: 0.4
            }
        },
        {
            time: 0.8,
            body: {
                y: 0,
                duration: 0.2
            }
        },
        {
            time: 0.9,
            legRight: {
                x: -0.5,
                duration: 0.1
            },
            legLeft: {
                z: 0,
                x: 0.5,
                duration: 0.1
            }
        }
    ],


    defaultDance: [
        {
            time: 0,
            armLeft: {
                x: -0.8,
                z: 0.2,
                duration: 0.1
            },
            armRight: {
                x: -0.8,
                z: -0.2,
                duration: 0.1
            }
        },
        {
            time: 0.1,
            armLeft: {
                x: -1.2,
                z: -0.6,
                duration: 0.1
            },
            armRight: {
                x: -1.2,
                z: 0.6,
                duration: 0.1
            },
            body: {
                x: 0.6,
                yp: -0.5,
                duration: 0.3
            },
            head: {
                x: -0.6,
                duration: 0.3
            },
            legLeft: {
                x: -0.3,
                duration: 0.2
            },
        },
        {
            time: 0.2,
            legRight: {
                x: -0.6,
                yp: 2,
                zp: 2,
                duration: 0.2
            },
            armLeft: {
                z: -0.1,
                x: -1.5,
                duration: 0.2
            },
            armRight: {
                z: 0.1,
                x: -1.5,
                duration: 0.2
            }
        },
        {
            time: 0.4,
            armLeft: {
                x: 0.5,
                z: 0.2,
                duration: 0.2
            },
            armRight: {
                x: 0.5,
                z: -0.2,
                duration: 0.2
            },
            legRight: {
                yp: 0,
                duration: 0.2
            },
            body: {
                yp: -1,
                x: 0.1,
                duration: 0.2
            },
            head: {
                x: -0.1,
                duration: 0.2
            },
            legLeft: {
                x: 0.3,
                duration: 0.2
            }
        },
        {
            time: 0.6,
            armLeft: {
                x: 0.1,
                yp: 2,
                duration: 0.2
            },
            armRight: {
                x: 0.1,
                yp: 2,
                duration: 0.2
            },
            head: {
                yp: -1,
                duration: 0.2
            },
            body: {
                yp: 1,
                duration: 0.2
            },
            legRight: {
                yp: 0,
                zp: 0,
                x: 0.5,
                duration: 0.2
            },
            legLeft: {
                yp: 2,
                zp: 2,
                duration: 0.2
            }
        },
        {
            time: 0.8,
            armLeft: {
                x: -0.1,
                zp: 1,
                y: -0.5,
                yp: -1,
                z: -0.1,
                duration: 0.2
            },
            armRight: {
                x: -0.1,
                zp: 1,
                y: 0.5,
                yp: -1,
                z: 0.1,
                duration: 0.2
            },
            legLeft: {
                yp: 0,
                x: -1,
                duration: 0.2
            },
            body: {
                yp: 0,
                duration: 0.2
            }
        },
        {
            time: 1,
            armLeft: {
                x: -0.3,
                xp: 1,
                z: -0.2,
                yp: 2,
                y: 0,
                duration: 0.2
            },
            armRight: {
                x: -0.3,
                xp: -1,
                z: 0.2,
                yp: 2,
                y: 0,
                duration: 0.2
            },
            legLeft: {
                yp: 0,
                zp: 0,
                x: 0.2,
                duration: 0.2
            },
            body: {
                yp: 1,
                duration: 0.2
            },
            legRight: {
                yp: 2,
                zp: 2,
                x: -0.2,
                duration: 0.2
            }
        },
        {
            time: 1.2,
            armLeft: {
                xp: 0,
                x: -0.1,
                zp: 1,
                y: -0.5,
                yp: -1,
                z: -0.1,
                duration: 0.2
            },
            armRight: {
                xp: 0,
                x: -0.1,
                zp: 1,
                y: 0.5,
                yp: -1,
                z: 0.1,
                duration: 0.2
            },
            body: {
                yp: 0,
                duration: 0
            },
            legLeft: {
                yp: 0,
                zp: 0,
                x: 0.5,
                duration: 0.2
            },
            legRight: {
                x: -1,
                yp: 0,
                zp: 2,
                duration: 0.2
            }
        }
    ]
}

export default animations;