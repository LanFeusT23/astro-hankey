<template>
    <div id="connected-vertices" class="fixed top-0 left-0 w-full h-full opacity-15"></div>
</template>

<script>
import P5 from "p5"
import Particle from "./Particle"
const MIN_WINDOW_WIDTH = 1500

export default {
    name: "ConnectedVertices",
    data() {
        return {
            particles: [],
            windowWidth: 100,
            windowHeight: 100,
            verticesScript: undefined
        }
    },
    methods: {
        createParticles(amount, radius, p5) {
            this.particles = []
            for (let i = 0; i < amount; i++) {
                this.particles.push(new Particle(radius, p5))
            }
        },
        reportWindowSize() {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
        },
        createVertices() {
            const script = p5 => {
                p5.setup = _ => {
                    var canvas = p5.createCanvas(this.windowWidth, this.windowHeight)
                    canvas.parent("connected-vertices")
                    this.createParticles(50, undefined, p5)
                }

                p5.draw = _ => {
                    p5.clear()
                    this.particles.forEach(p => {
                        p.update()
                        p.walls(p5)
                        p.draw(p5)
                    })

                    for (let i = 0; i < this.particles.length; i++) {
                        for (let j = i + 1; j < this.particles.length; j++) {
                            const p1 = this.particles[i]
                            const p2 = this.particles[j]

                            p5.stroke(255)
                            const distance = p5.floor(p1.v.dist(p2.v))
                            if (distance < 400) {
                                p5.stroke(255, p5.map(distance, 0, 100, 1000, 0))
                                p5.line(p1.v.x, p1.v.y, p2.v.x, p2.v.y)
                            }
                        }
                    }
                }
            }

            this.verticesScript = new P5(script)
        }
    },
    watch: {
        windowWidth: {
            handler(val) {
                if (val >= MIN_WINDOW_WIDTH) {
                    if (!this.verticesScript) {
                        this.createVertices()
                    } else {
                        this.verticesScript.resizeCanvas(this.windowWidth, this.windowHeight)
                    }
                } else if (val < MIN_WINDOW_WIDTH) {
                    if (this.verticesScript) {
                        this.verticesScript.remove()
                        this.verticesScript = undefined
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.reportWindowSize()
        window.addEventListener("resize", this.reportWindowSize)
    },
    destroyed() {
        window.removeEventListener("resize", this.reportWindowSize)
    }
}
</script>

<style lang="scss" scoped>
#connected-vertices {
    z-index: -1;
}

canvas {
    touch-action: none;
}
</style>
