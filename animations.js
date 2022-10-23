const animations = {
    wave: [
        {
            time: 0,
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
            time: [0.125, 0.375, 0.625],
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
            }
        },
        {
            time: 0.8,
            armLeft: {
                x: 0,
                duration: 0.2
            },
            armRight: {
                x: 0,
                duration: 0.2
            },
            legLeft: {
                x: 0,
                duration: 0.2
            },
            legRight: {
                x: 0,
                duration: 0.2
            },
            body: {
                x: -6.3,
                duration: 0.2
            },
            head: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.2
            }
        }
    ],


    barrelRoll: [
        {
            time: 0,
            body: {
                z: 0.5,
                x: 0,
                y: 1.5,
                yp: -3,
                duration: 0.2
            },
            legRight: {
                x: 0,
                z: -0.5,
                duration: 0.2
            },
            legLeft: {
                x: 0,
                z: 0.4,
                duration: 0.2
            },
            armRight: {
                x: 0,
                z: -2.5,
                duration: 0.2
            },
            armLeft: {
                x: 0,
                z: 0.3,
                duration: 0.2
            },
            head: {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.2
            }
        },
        {
            time: 0.2,
            body: {
                z: 6.3,
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
                yp: 5,
                duration: 0.4
            }
        },
        {
            time: 0.6,
            armLeft: {
                z: 0,
                duration: 0.4
            },
            body: {
                yp: 0,
                duration: 0.4
            }
        },
        {
            time: 1,
            legLeft: {
                z: 0,
                duration: 0.1
            }
        }
    ]
}