$(function () {
    getUserinfo();
    // 设置点击退出事件
    //layui 弹出层
    var layer = layui.layer;
    $('#pushout').on('click', function () {
        layer.confirm('确定退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//获取用户的基本信息



function getUserinfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        headers: {

        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.username || user.nickname;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('text-avatar').html(first).show();
    }
}