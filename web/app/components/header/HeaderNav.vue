<template>
  <div @mouseover="$emit('response', name)" @mouseleave="$emit('response', '')">
    {{ name }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
defineEmits(["response"]);
</script>
