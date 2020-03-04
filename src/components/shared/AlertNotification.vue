<template>
    <transition @enter="enter" @leave="leave" :css="false">
        <div v-if="showNotification" class="absolute bottom-0 z-40 flex justify-center w-full pb-8 message-notification">
             <div class="relative z-40 flex items-center pt-2 pb-2 pl-4 pr-4 text-gray-600 bg-gray-900 rounded-lg shadow-lg">            
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    import { gsap } from "gsap"
    const ANIMATION_SPEED = 0.8

    export default {
        name: "AlertNotification",
        props: {
            showNotification: {
                type: Boolean,
                default: false
            },
            disableAnimations: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            enter(el, done) {
                gsap
                    .fromTo(el, {
                        y: "-100%"
                    }, {
                        y: "0",
                        ease: "back.out(.6)",
                        duration: this.disableAnimations ? 0 : ANIMATION_SPEED,
                        onComplete: done
                    })
            },
            leave(el, done) {
                gsap
                    .fromTo(el, {
                        y: "0"
                    }, {
                        y: "-100%",
                        ease: "elastic.in(.6, .4)",
                        duration: this.disableAnimations ? 0 : ANIMATION_SPEED,
                        onComplete: done
                    })
            }
        }
    }
</script>