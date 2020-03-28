export default class Particle {
    constructor(r, p5) {
        this.v = p5.createVector(p5.random(p5.width), p5.random(p5.height))
        this.r = r || p5.random(4) + 1.5
        this.speedX = p5.random(-1, 1)
        this.speedY = p5.random(-1, 1)
    }

    update() {
        this.v.x += this.speedX
        this.v.y += this.speedY
    }

    walls(p5) {
        if (this.v.x <= -this.r) {
            this.v.x = p5.width
        } else if (this.v.x >= p5.width + this.r) {
            this.v.x = -this.r
        }
        if (this.v.y <= -this.r) {
            this.v.y = p5.height
        } else if (this.v.y >= p5.height + this.r) {
            this.v.y = -this.r
        }
    }

    draw(p5) {
        p5.noStroke()
        p5.fill(255)
        p5.circle(this.v.x, this.v.y, this.r)
    }
}
