const getters = {
    //获取火警信息
    getTestList : state => {
        return state.testList.filter(item => item.num == 119)
    }
}
export default getters
