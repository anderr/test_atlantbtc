<template>
  <div class="trader">
    <div class="trader__actions">
      <trader-button
        text="Добавить"
        @click="addNew"
        :class="{ disabled: windows.length > 5 }"
      />
      <trader-button
        text="Удалить"
        @click="removeWindow"
        :class="{ disabled: windows.length === 0 }"
      />
    </div>

    <div class="trader__list">
      <div
        v-for="item in windows"
        :key="item.id"
        :class="{ show: item.show }"
        class="trader__list-item"
        @click="toggleWindow(item.id)"
      >
        Window {{ item.id }}
      </div>
    </div>

    <div
      class="trader__grid"
      ref="grid"
      @mousemove="mouseMove"
      @mouseup="stopChase"
    >
      <div
        v-show="item.show"
        v-for="item in windows"
        v-resize:debounce.500="onResize"
        :data-id="item.id"
        :key="item.id"
        :style="{
          width: `${item.width}px`,
          height: `${item.height}px`,
          left: getPosition(item.id).left + 'px',
          top: getPosition(item.id).top + 'px',
          'z-index': item.zindex
        }"
        :ref="`window-${item.id}`"
        :class="{ drag: isDragging }"
        class="trader__window"
      >
        <!-- 'max-width': $refs.grid.offsetWidth / 2 + 'px',
      'max-height': $refs.grid.offsetHeight / 2 + 'px' -->
        <div
          class="trader__window-header"
          @mousedown="startChase($event, item.id)"
          @mouseup="stopChase"
        >
          <span>Window {{ item.id }}</span>
          <div class="trader__window-close" @click="toggleWindow(item.id)">
            &times;
          </div>
        </div>
        <div class="trader__window-body">
          x:{{ getPosition(item.id).left + 'px' }}, y:{{
            getPosition(item.id).top + 'px'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TraderButton from '@/components/_atom/TraderButton'
import resize from 'vue-resize-directive'

export default {
  components: {
    TraderButton
  },

  directives: {
    resize
  },

  data() {
    return {
      isDragging: false,
      currentWindow: null
    }
  },

  computed: {
    ...mapState('trader', ['windows']),

    ...mapGetters('trader', ['getPosition'])
  },

  methods: {
    ...mapMutations('trader', ['SET_INIT_WINDOWS']),

    ...mapActions('trader', [
      'addNewWindow',
      'removeWindow',
      'setDimensions',
      'setPosition',
      'toggleWindow',
      'setZindexOnFront'
    ]),

    initWindows() {
      if (this.$ls.get('windows') !== null) {
        const windows = JSON.parse(this.$ls.get('windows'))

        if (windows.length > 0) {
          this.SET_INIT_WINDOWS(windows)
        }
      }
    },

    addNew() {
      this.addNewWindow({
        left: this.$refs.grid.offsetWidth / 2 - 150,
        top: this.$refs.grid.offsetHeight / 2 - 50
      })
    },

    startChase(e, id) {
      this.setZindexOnFront(id)
      this.isDragging = true
      this.currentWindow = id

      document.documentElement.style.cursor = 'grabbing'
    },

    stopChase() {
      this.isDragging = false
      this.currentWindow = null

      document.documentElement.style.cursor = 'default'
    },

    findPositionInsideBound(e) {
      const x =
        e.clientX -
        this.$refs[`window-${this.currentWindow}`][0].offsetWidth / 2
      const y =
        e.clientY -
        this.$refs[`window-${this.currentWindow}`][0].offsetHeight / 2

      return this.clampInsideBoundary(x, y)
    },

    clampInsideBoundary(x, y) {
      const gridPos = this.$refs.grid.getBoundingClientRect()
      const maxWidth =
        gridPos.width -
        this.$refs[`window-${this.currentWindow}`][0].offsetWidth
      const maxHeight =
        gridPos.height -
        this.$refs[`window-${this.currentWindow}`][0].offsetHeight

      return {
        x: this.clamp(x - gridPos.x, 0, maxWidth),
        y: this.clamp(y - gridPos.y, 0, maxHeight)
      }
    },

    mouseMove(e) {
      if (this.isDragging) {
        const position = this.findPositionInsideBound(e)
        const params = {
          id: this.currentWindow,
          left: Math.round(position.x / 10) * 10,
          top: Math.round(position.y / 10) * 10
        }

        this.setPosition(params)
      }
    },

    clamp(num, lower = 0, upper) {
      return num < lower ? lower : num > upper ? upper : num
    },

    onResize(el) {
      const params = {
        id: Number(el.dataset.id),
        width: Math.round(el.offsetWidth / 10) * 10,
        height: Math.round(el.offsetHeight / 10) * 10
      }

      this.setDimensions(params)
    }
  },

  mounted() {
    this.initWindows()
  }
}
</script>

<style lang="scss" scoped>
.trader {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__actions {
    flex: 0 0 auto;

    > * {
      margin: 0 5px;
    }
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 0;
  }

  &__list-item {
    background: #d4e8ff;
    padding: 10px 20px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &.show {
      background: #22aff1;
      transition: background 0.3s;
    }
  }

  &__grid {
    flex: 1;
    position: relative;
    border: 1px solid #d4e8ff;
  }

  &__window {
    border: 1px solid #eef;
    box-shadow: 0 0 10px 1px rgba(34, 175, 241, 0.1);
    position: absolute;
    display: flex;
    flex-direction: column;
    resize: both;
    overflow: auto;
    min-width: 300px;
    min-height: 100px;
    max-width: 600px;
    max-height: 600px;
    transition: box-shadow 0.5s;

    &.drag {
      box-shadow: 0 0 15px 3px rgba(34, 175, 241, 0.2);
      transition: box-shadow 0.5s;
    }
  }

  &__window-header {
    background: #d4e8ff;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    span {
      cursor: grab;
      flex: 1;
      text-align: left;
    }
  }

  &__window-close {
    font-size: 22px;
    width: 24px;
    height: 24px;
    color: lighten(#22aff1, 20%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #22aff1;
      transition: color 0.3s;
    }
  }

  &__window-body {
    padding: 20px;
    background: #fff;
    height: 100%;
  }
}
</style>
