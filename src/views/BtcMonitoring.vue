<template>
  <div class="btc">
    <h1>BTC Monitoring</h1>

    <div class="btc__actions">
      <trade-button
        class="btc__button"
        text="Start"
        color="green"
        @click="subscribeBtc"
      />

      <trade-button
        class="btc__button"
        text="Stop"
        color="red"
        @click="unsubscribeBtc"
      />

      <trade-button
        class="btc__button"
        text="Reset"
        color="orange"
        @click="RESET_STATE"
      />
    </div>

    <div class="btc__sum">{{ getTransactionsSum }} BTC</div>

    <div v-if="transactions.length > 0" class="btc__table">
      <div class="btc__table-head">
        <div class="btc__column">From</div>
        <div class="btc__column">To</div>
        <div class="btc__column">Sum</div>
      </div>

      <div v-for="item in transactions" :key="item.hash" class="btc__table-row">
        <div class="btc__column">
          <div
            v-for="(trans, index) in item.from"
            :key="index"
            class="btc__transaction red"
          >
            {{ trans }}
          </div>
        </div>

        <div class="btc__column">
          <div
            v-for="(trans, index) in item.to"
            :key="index"
            class="btc__transaction green"
          >
            {{ trans }}
          </div>
        </div>

        <div class="btc__column btc__value">{{ item.sum }} ₿</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TradeButton from '@/components/_atom/TraderButton'

export default {
  components: {
    TradeButton
  },

  computed: {
    ...mapState('btc', ['transactions']),

    ...mapGetters('btc', ['getTransactionsSum'])
  },

  methods: {
    ...mapMutations('btc', ['RESET_STATE']),

    ...mapActions('btc', ['addTransaction']),

    subscribeBtc() {
      this.$socket.sendObj({ op: 'unconfirmed_sub' })
      this.$options.sockets.onmessage = data => this.addTransaction(data.data)
    },

    unsubscribeBtc() {
      this.$socket.sendObj({ op: 'unconfirmed_unsub' })
    }
  },

  created() {
    this.$root.$connect()
  },

  beforeDestroy() {
    this.$root.$disconnect()
  }
}
</script>

<style lang="scss">
.btc {
  &__actions {
    margin: 20px auto;
  }

  &__button {
    margin: 0 10px;
  }

  &__sum {
    margin: 20px auto;
    font-size: 30px;
  }

  &__table {
    width: 100%;
    max-width: 1400px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #22aff1;
    border-bottom: none;
    padding: 0;
  }

  &__table-head,
  &__table-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #22aff1;
  }

  &__table-head {
    background: #d4e8ff;
  }

  &__transaction,
  &__value {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.red {
      color: #550e01;
    }

    &.green {
      color: #0e2f00;
    }
  }

  &__column {
    text-align: left;
    padding: 10px;

    &:nth-child(1) {
      width: 40%;
    }
    &:nth-child(2) {
      width: 40%;
    }
    &:nth-child(3) {
      width: 20%;
    }
  }
}
</style>
