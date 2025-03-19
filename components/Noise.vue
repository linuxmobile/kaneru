<script>
export default {
  data() {
    return {
      noise: null
    }
  },
  methods: {
    generateNoise() {
      this.noise = document.createElement('canvas');
      this.noise.height = window.innerHeight * 2;
      this.noise.width = window.innerWidth * 2;

      let noiseContext = this.noise.getContext('2d');
      let noiseData = noiseContext.createImageData(
        this.noise.width,
        this.noise.height
      );

      for (let i = 0; i < noiseData.data.length; i += 4) {
        const gray = Math.floor(Math.random() * 255);
        noiseData.data[i] = gray;
        noiseData.data[i + 1] = gray;
        noiseData.data[i + 2] = gray;
        noiseData.data[i + 3] = 255;
      }

      noiseContext.putImageData(noiseData, 0, 0);
    },

    moveNoise() {
      let canvas = this.$refs.canvas;
      let context = canvas.getContext('2d');

      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(this.noise, -x, -y);

      requestAnimationFrame(this.moveNoise);
    }
  },

  mounted() {
    this.$refs.canvas.height = window.innerHeight;
    this.$refs.canvas.width = window.innerWidth;

    this.generateNoise();
    requestAnimationFrame(this.moveNoise);
  },

  beforeUnmount() {
    cancelAnimationFrame(this.moveNoise);
  }
}
</script>

<template>
  <canvas ref="canvas"
    class="h-full w-full opacity-10 dark:opacity-5 left-0 top-0 pointer-events-none mix-blend-multiply position-fixed z-9000 dark:mix-blend-screen"></canvas>
</template>
