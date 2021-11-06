<template>
  <div
    class="button"
    @click="$emit('click')"
    :class="{
      disabled: disabled,
      green: color === 'green',
      red: color === 'red',
      orange: color === 'orange'
    }"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  background: #453cc9;
  padding: 7px 20px;
  color: #fff;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #22aff1;
    transition: background 0.3s;
  }

  &:active {
    background: #102754;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  &.green {
    background: #4cc93c;

    &:hover {
      background: lighten(#4cc93c, 10%);
      transition: background 0.3s;
    }
  }

  &.red {
    background: #d94b2c;

    &:hover {
      background: lighten(#d94b2c, 10%);
      transition: background 0.3s;
    }
  }

  &.orange {
    background: #c9783c;

    &:hover {
      background: lighten(#c9783c, 10%);
      transition: background 0.3s;
    }
  }
}
</style>
