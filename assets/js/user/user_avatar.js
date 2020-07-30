$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    var layer = layui.layer;
    // 1.2 配置选项
    const options = {
        // 区域的纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //给上传按钮绑定点击事件
    $('#btnchooseimg').on('click', function () {
        $('#file').click();
    })
    //为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        console.log(e);
        var filelist = e.target.files;
        console.log(filelist);
        if (filelist.length == 0) {
            return layer.msg('请选择图片')
        }

        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#btnupload').on('click', function () {
        // 
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserinfo()
            }
        })
    })
})