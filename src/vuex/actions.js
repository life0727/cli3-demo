const actions = {
    changeTestListAsync:({commit},query) => {
        setTimeout(() => {
            commit('changeTestList',query)
        }, 1000)
     },
}
export default actions
