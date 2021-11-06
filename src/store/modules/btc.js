const getDefaultState = () => {
  return {
    transactions: []
  }
}

const state = getDefaultState()

const getters = {
  getTransactionsSum: state => {
    let sum = 0

    for (var i = 0; i < state.transactions.length; i++) {
      sum += state.transactions[i].sum
    }

    return sum
  }
}

const mutations = {
  ADD_TRANSACTION: (state, payload) => {
    state.transactions.push(payload)
  },

  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  addTransaction({ commit }, payload) {
    const message = JSON.parse(payload)
    const from = message.x.inputs.map(x => x.prev_out.addr)
    const to = message.x.out.map(x => x.addr)

    let sum = 0
    for (let i = 0; i < message.x.inputs.length; i++) {
      sum += message.x.inputs[i].prev_out.value
    }

    const transaction = {
      hash: message.x.hash,
      from: from,
      to: to,
      sum: sum * 0.00000001 // satoshi to btc
    }

    commit('ADD_TRANSACTION', transaction)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
