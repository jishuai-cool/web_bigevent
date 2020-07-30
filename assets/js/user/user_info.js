$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '字符长度1~6个字符'
            }
        }
    })
    inituserinfo()

    function inituserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                form.val('userAllInfo', res.data)
            }
        })
    }
    //点击重置按钮 对表单进行重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        inituserinfo();
    })
    //请求更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserinfo();
            }
        })
    })
})