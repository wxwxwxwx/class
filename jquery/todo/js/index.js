
// todos-jquery
// [{"id":"0dd57c2e-1d1f-4099-8de9-09489147fa1c","title":"aaa","completed":false}]


$(function(){
	////定义数组
	var  datas=[]
	var a ;
	/////本地存储
	if(localStorage.data){
		datas = JSON.parse(localStorage.data)
		render()
		 if(datas.length===0){
		$('.hide').css('display','none')
	}
	}else{
		localStorage.setItem('data',JSON.stringify(datas))
	// $('#todo-list').empty('')
	 if(datas.length===0){
		$('.hide').css('display','none')
	}
	}
	console.log(datas)


	//////////////渲染
 	function render(){
 		$('#todo-list').empty('')
		var x = datas.length	
 		if(datas.length===0){
		b = 10010;
		$('<li>').attr('data-id',b).appendTo($('#todo-list')).html('<div class="view"> <input class="toggle check" type="checkbox"> <label>'+a+'</label> <button class="destroy"></button> </div> <input class="edit" autofocus value="'+$(".inputs").val()+'">')
		}
		$(datas).each(function(i,v){
			var id = v.id
			$('<li>').attr('data-id',id).appendTo($('#todo-list')).html('<div class="view"> <input class="toggle check" type="checkbox"> <label>'+v.val+'</label> <button class="destroy"></button> </div> <input class="edit" autofocus value="'+v.val+'">')			
		})	
		$('#todo-count').html('<strong>'+x+'</strong> items left')
 	}
 	/////////add

    $(".inputs").keydown(function(e){
    	if(e.keyCode===13){
    		a = $(this).val()
    		var arr = {}
    		if(datas.length===0){
    			arr = {id:10010,val:a}
    			datas.push(arr)
    			localStorage.setItem('data',JSON.stringify(datas))
    		}else{
    			var num =Number( datas[datas.length-1].id)+1
    			arr={id:num,val:a}
    			datas.push(arr)
    			localStorage.setItem('data',JSON.stringify(datas))
    		}
    		$('.hide').css('display','block')
    		render()
    	$(this).val('')

    	}
    })

    ///////delete btn
    $('#todo-list').on('mouseenter mouseleave','li',function(){
    	$(this).find('button').toggle()
    })
   $('#todo-list').on('click','button',function(){
    	var id = Number($(this).parent().parent().attr('data-id'))  	
    	deleteHandler(id)   	
    })
///////////////deledeHandler
var deleteHandler = function(id){
	var arr=[]
	$(datas).each(function(i,v){
    		if(v.id!==id){
    			arr.push(v)
    		}
    	})
    	datas = arr
    	if(datas.length===0){
   	$('.hide').css('display','none')
   }
   localStorage.setItem('data',JSON.stringify(datas))
    	render()
}


//////////////////选中删除
  $('#todo-list').on('click','toggle',function(){
  console.log(this)
  	if($(this).is(':checked')){
  		$(this).removeClass('check')
  		$(this).addClass('checked')
  		$(this).parent().parent().addClass('completed')
  	}else{
  		$(this).removeClass('checked')
  		$(this).addClass('check')
  		$(this).parent().parent().removeClass('completed')
  	}
  	if($('.toggle:checked').length!==0){
  		$('#clear-completed').css('display','block')
  	}
  	var y = $('.toggle:checked').length
  	var x = datas.length-y
	$('#todo-count').html('<strong>'+x+'</strong> items left')
  })

//////////////////删除选中
  $('#clear-completed').on('click',function(){

  	$('.toggle:checked').each(function(i,v){  	
  		
  		 var id = Number($(this).parent().parent().attr('data-id'))
  		 deleteHandler(id)
  	})
  })


//////////////////////双击进入修改信息
    $('#todo-list').on('dblclick','li',function(){
    	$(this).addClass('editing')
    	$(this).find('.toggle').toggle().val('')

    })

//////////////////////////////修改信息事件

    $('#todo-list').on('keydown','li',function(e){
    	if( e.keyCode===13 ){
    		var id =Number ($(this).attr('data-id'))
    		$(datas).each(function(i,v){
    			if(v.id===id){
    				v.val =  $('li[data-id='+id+']').find('.edit').val()
    			}
    		})
    		
    		localStorage.setItem('data',JSON.stringify(datas))
    	render()
    	}
    })


//////////////////all active compleated 选项卡切换
    $('.select').on('click',function(){
    	$('.selected').removeClass('selected')
    	$(this).addClass('selected')
    	if( $('.selected').is('.activea') ){
    		$('#todo-list').show()
		$('.toggle:checked').parent().parent().hide()
 		}else if( $('.selected').is('.completeda') ){
 			$('#todo-list').hide()
 		}else if( $('.selected').is('.alla') ){
 			$('#todo-list').show()
 			$('.toggle:checked').parent().parent().show()
 		}
    })


    $('#footer').on('click',false)

})