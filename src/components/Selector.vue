<template>
  <div class="step-indicators">
    <span
      v-for="(step, index) in steps"
      :key="index"
      :class="{ active: currentStep === index }"
      @click="changeStep(index)"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:currentStep'],
  methods: {
    changeStep(index) {
      this.$emit('update:currentStep', index)
    },
  },
}
</script>

<style scoped>
.step-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px;
}

.step-indicators span {
  width: 15px;
  height: 15px;
  border: 2px solid gray;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.step-indicators span.active {
  background-color: white;
  border-color: black;
}
</style>
