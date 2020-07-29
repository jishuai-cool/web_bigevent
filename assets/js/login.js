$(function () {
    $('#link-login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-reg').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            $('#link-reg').click();
        })
    })
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})