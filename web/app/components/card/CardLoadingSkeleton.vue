<template>
  <div class="w-full h-full shimmer"></div>
</template>
<style>
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    #f0f0f0 50%,
    transparent 100%
  );
  animation: shimmerAnimation 1.5s infinite linear;
}

@keyframes shimmerAnimation {
  100% {
    left: 100%;
  }
}
</style>
