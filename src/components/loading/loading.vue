<template>
  <div class="loading">
    <div class="round1"></div>
    <div class="round2"></div>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped lang="scss">
  .loading {
    width: 60px;
    height: 60px;
    position: relative;
    .round1, .round2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: forestgreen;
      opacity: 0.6;
      animation: bounce 2.0s infinite ease-in-out;
    }
    .round2 {
      animation-delay: 1s;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
    }
  }
</style>
