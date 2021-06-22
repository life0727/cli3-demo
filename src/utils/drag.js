import Vue from 'vue';

const drag = Vue.directive('drag',{
  inserted(el){
    const ele = el.querySelector('.el-dialog__header') || el.querySelector('.el-drawer__header') || el; //给dialog-header添加拖拽
    ele.style.cursor = 'move'
    ele.onmousedown = (e) => {
      
      const disx = e.pageX - el.offsetLeft;
      const disy = e.pageY - el.offsetTop;
      document.onmousemove = (e) => {
        el.style.left = e.pageX - disx + 'px';
        el.style.top = e.pageY - disy + 'px';
      }
      document.onmouseup = (e) => {
        if(el.offsetTop < -56){
          el.style.top = 0 +'px'
        }
        document.onmousemove = document.onmouseup = null;
      }
    }
  }
})

export default drag;
