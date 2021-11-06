const getDefaultState = () => {
  return {
    windows: []
  }
}

const state = getDefaultState()

const getters = {
  getPosition: state => id => {
    const index = state.windows.findIndex(x => x.id === id)

    if (index >= 0) {
      return {
        left: state.windows[index].left,
        top: state.windows[index].top
      }
    }
  }
}

const mutations = {
  ADD_NEW_WINDOW: (state, payload) => {
    state.windows.push({
      id: payload.id,
      width: payload.width,
      height: payload.height,
      left: payload.left,
      top: payload.top,
      show: true,
      zindex: payload.id
    })
  },

  REMOVE_WINDOW: state => {
    state.windows.splice(-1, 1)
  },

  TOGGLE_WINDOW: (state, windowId) => {
    const index = state.windows.findIndex(x => x.id === windowId)

    if (index >= 0) {
      if (state.windows[index].show) {
        state.windows[index].show = false
      } else {
        state.windows[index].show = true
      }
    }
  },

  SET_POSITION: (state, payload) => {
    const index = state.windows.findIndex(x => x.id === payload.id)

    if (index >= 0) {
      state.windows[index].left = payload.left
      state.windows[index].top = payload.top
    }
  },

  SET_DIMENSIONS: (state, payload) => {
    const index = state.windows.findIndex(x => x.id === payload.id)

    if (index >= 0) {
      state.windows[index].width = payload.width
      state.windows[index].height = payload.height
    }
  },

  SET_INIT_WINDOWS: (state, payload) => {
    state.windows = payload
  },

  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  addNewWindow({ commit, dispatch, state }, params) {
    dispatch('sortWindows', 'id')
    let newId = 0

    if (state.windows.length > 0) {
      newId = state.windows[state.windows.length - 1].id + 1
    }

    const windowObj = {
      id: newId,
      width: 300,
      height: 100,
      left: params.left,
      top: params.top
    }

    commit('ADD_NEW_WINDOW', windowObj)

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  removeWindow({ commit }) {
    commit('REMOVE_WINDOW')

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  setDimensions({ commit }, params) {
    commit('SET_DIMENSIONS', params)

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  setPosition({ commit }, params) {
    commit('SET_POSITION', params)

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  toggleWindow({ commit }, params) {
    commit('TOGGLE_WINDOW', params)

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  setZindexOnFront({ dispatch, state }, windowId) {
    const index = state.windows.findIndex(x => x.id === windowId)

    dispatch('sortWindows', 'zindex')

    if (index >= 0) {
      state.windows[index].zindex =
        state.windows[state.windows.length - 1].zindex + 1
    }

    this._vm.$ls.set('windows', JSON.stringify(state.windows))
  },

  sortWindows({ state }, key) {
    state.windows.sort((a, b) => {
      return a[key] > b[key]
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
