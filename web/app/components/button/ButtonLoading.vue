<template>
  <div class="flex ml-2">
    <div class="animate-bounce">.</div>
    <div class="animate-bounce second">.</div>
    <div class="animate-bounce third">.</div>
  </div>
</template>
<style scoped>
.border-spin {
  border-radius: 50%;
  border: 0.2rem solid transparent;
  border-top-color: white;
  border-left-color: white;
  border-bottom-color: white;
}
.second {
  animation-delay: 0.1s;
}

.third {
  animation-delay: 0.2s;
}
</style>
