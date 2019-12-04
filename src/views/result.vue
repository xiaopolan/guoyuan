<!-- 登录页 -->
<style scoped>
	#body{
		background: #FFFFFF !important;
	}
	.registerBox{
		padding-top: 50px;
	}
	.success{
		width:100%;
		text-align: center;
		height:80px;
		line-height: 40px;
		font-size: 20px;
		color:#BA3238
	}
	.failed{
		width:100%;
		text-align: center;
		height:80px;
		line-height: 40px;
		font-size: 20px;
		color: #333333;
	}
	.msgtext{
		font-size: 16px;
	}
	.logo_image{
		width:80px;
		height:80px;
		background: url(../assets/img/success.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}
	.logo_image2{
		width:50px;
		height:50px;
		background: url(../assets/img/fail.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.down_image_dev{
		width:120px;
		height:120px;
		background: url(../assets/img/down.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.down_image_prod{
		width:120px;
		height:120px;
		background: url(../assets/img/download.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.saomiao{
		font-size: 10px;
	}
</style>

<template>
    <div class="registerBox">
		<div class="success">
			<div class='logo_image'></div>
			<p>注册成功!</p>
			<!-- <a class='msgtext' v-bind:href="link">点击下载app</a> -->
			<!-- <div class='down_image_dev'></div> -->
			<div class='down_image_prod'></div>
			<p class="saomiao">扫描二维码下载app</p>
		</div>
    </div>
</template>
<script>
export default {
    name: "result",
    components: {},
    data() {
        return {
        };
    },
	beforeCreate(){
		
	},
    created() {
    },
	mounted() {
	},
    methods: {
			
    }
};
</script>
