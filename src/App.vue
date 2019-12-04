<template>
    <div id="body">
        <!-- 浏览器低版本提醒 -->
        <div v-if="warning">
            <h1>你的浏览器版本过低，可能导致网站不能正常访问！</h1>
            <p>为了你能正常使用网站功能，请使用</p>
            <p>Chrome35+</p>
            <p>Firefox31+</p>
            <p>IE10+</p>
            <p>等浏览器。</p>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {
            warning: false
        };
    },
    created() {
        var n = navigator;
        if (
            n.appName === "Microsoft Internet Explorer" &&
            (n.appVersion.split(";")[1].replace(/ |MSIE/g, "") | 0) < 10
        ) {
            this.warning = true;
        }
    }
};
</script>
