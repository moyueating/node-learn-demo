function postAdd(){
    console.log(11111111111111)
    $.ajax({
        url: '/pics/add',
        method: 'post',
        success: function(){
            console.log('post ajax successful')
            window.location.reload()
        }
    })
}
$('.add').click(postAdd)