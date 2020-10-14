<template>
    <div class="Textarea">
        <el-form :style="{right:textareaTransform ? right : '60px'}" >
            <i :class="textareaShow ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"
               :style="{right : showUpload ? '-43px' : '0px'}" @click="textareaChange"></i>
            <el-input ref="elInput"  :autosize="{ minRows: 1, maxRows: 20}" :class="uploadBtnStatus && 'textAreaStyle'" type="textarea"
                      v-model="textareaValue" v-show="textareaShow"
                      @keydown.native="toMsg($event)"></el-input>
            <el-upload
                    :auto-upload="false"
                    :on-change="uploadSuccess"
                    :class="uploadBtnStatus ? 'textareaUploadShow' : 'textareaUploadHide'"
                    drag
                    v-show="textareaShow"
                    action="#">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <el-button :class="uploadBtnStatus ? 'uploadBtnActive' : 'uploadBtn'" v-show="showUpload && textareaShow"
                       icon="el-icon-upload" @click="switchUploadBtn"></el-button>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'Textarea',
        props: {
            textareaTransform: { //是否要向左移
                type: Boolean,
                default: false
            },
            showUpload: { //默认展示上传按钮
                type: Boolean,
                default: false
            },
            onlyDrag: {
                type: Boolean,
                default: false
            },
            base: {
                type: Object,
               // required: true
            },
            right:{ //向右偏移多少
                type:String,
                default:'35%'
            }
        },
        mounted(){},
        data() {
            return {
                textareaValue: '',//textarea的内容
                textareaShow: true,//textarea的显示状态
                uploadBtnStatus: this.onlyDrag //上传按钮状态
            };
        },
        methods: {
            textareaChange() { //控制textarea显示与隐藏
                this.textareaShow = !this.textareaShow;
                this.$emit('update:showUpload', !this.showUpload);
                this.$emit('textareaChange', this.textareaShow);
            },
            switchUploadBtn() { //上传按钮点击事件
                if (this.onlyDrag) {
                    return;
                }
                this.uploadBtnStatus = !this.uploadBtnStatus;
            },
            uploadSuccess(response) {
                let reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        this.$emit('showLinksAndPAth', data);
                        this.$message.success('上传读取成功');
                    } catch (err) {
                        this.$message.error(`load JSON document from file error: ${err.message}`);
                    }
                };
                reader.readAsText(response.raw);
            },
            toMsg(ev) {
            },
            showLnglat(data) {
            },
            renderPoi(poiIds, ds) {
            },
            queryLinks(param) {
            }
        }
    };
</script>
<style scoped lang='less'>
    .Textarea {

        .el-form {
            position: absolute;
            z-index: 100;
            width: 300px;
            top: 25px;
            transition: 0.5s;


            .el-icon-remove-outline {
                cursor: zoom-out;
                position: absolute;
                top: -20px;
                font-size: 21px;
                color: red;
            }

            .el-icon-circle-plus-outline {
                cursor: zoom-in;
                position: absolute;
                top: -20px;
                font-size: 21px;
                color: @themeColor;
            }

            .uploadBtn {
                position: absolute;
                right: -43px;
                top: 0;
                padding: 3px 10px;
                font-size: 22px;
                background: #FFF;
                border: 1px solid #DCDFE6;
                color: #606266
            }

            .uploadBtnActive {
                position: absolute;
                right: -43px;
                top: 0;
                padding: 3px 10px;
                font-size: 22px;
                color: @themeColor;
                border-color: #c6e2ff;
                background-color: #ecf5ff;
            }

            .textareaUploadShow, .textareaUploadHide {
                height: 0px;

                .el-icon-upload {
                    display: none;
                }

                .el-upload__text {
                    line-height: 30px;
                }

            }
        }
    }
</style>
