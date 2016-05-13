$( function(){
	var localdata = localStorage.todos;
	var todos = localdata?$.parseJSON(localdata):[]
	var state = localStorage.state || 'All'
	var flag = true

	var saveData = function(){
		localStorage.todos = JSON.stringify( todos )		
	}

	var render = function(){
		var filter
		var num;
		$('.selected').removeClass('selected')
		if( state === 'All' ){
			$('.all').addClass('selected')
			filter = todos
		}else if( state === 'Active' ){
			$('.active').addClass('selected')
			filter = $.grep(todos,function(v){
				return v.isDone===false
			})
		}else if( state === 'Completed' ){
			$('.completed').addClass('selected')
			filter = $.grep(todos,function(v){
				return v.isDone===true
			})
		}
		// if(todos.length===0){
		// 	$('#footer').css('display','none')
		// }else{

		// 	$('#footer').css('display','block')
		// }

		if(todos.length){
			$('#footer').css('display','block')
		}else{
			$('#footer').css('display','none')
		}

		$('#todo-list').empty('')

		$('#todo-list').append(function(){
			return $.map(filter,function(v){
				var completed = v.isDone?'completed':''
				var tmp = v.isDone?'checked':''
				return '<li data-id="'+v.id+'" class="'+completed+'"> <div class="view"> <input class="toggle check" '+tmp+' type="checkbox"> <label>'+v.contents+'</label> <button class="destroy"></button> </div> <input class="edit" value="'+v.contents+'"> </li>'
			})
		})
		$('#todo-count').html('<strong>'+filter.length+'</strong> items left')
	}
	render()

	var addTodo = function(e){
		if( e.keyCode===13 ){
			// console.log(aa)
			var aa = Math.max.apply(null,$.map(todos,function(v){
				return v.id
			}))+1
			if(!$.trim($(this).val())){
				return
			}
			var id = todos.length?aa:10010;
			todos.push({id:id,contents:$.trim($(this).val()),isDone:false})
			saveData()	
			render()		
			$(this).val('')
		}
	}

	var deleteTodo = function(){
		var id = parseInt($(this).closest('li').attr('data-id'))
		todos = $.grep(todos,function(v){
			return v.id != id
		})
		saveData()
		render()
	}

	var checkTodo = function(){
		
		var check = $(this).is(':checked')
		check?$(this).closest('li').addClass('completed'):$(this).closest('li').removeClass('completed')
		var id = Number ($(this).closest('li').attr('data-id'))
		$(todos).each(function(i,v){
			if(v.id===id){
				v.isDone=check
			}
		})
		saveData()		
	}

	var editTodo = function(){
		$(this).addClass('editing')
	}

	var saveTodo = function(){
		
		var val = $(this).val()		
		var id =parseInt($(this).closest('li').attr('data-id'))
		$(todos).each(function(i,v){
			if( v.id === id ){
				v.contents = val
			}
		})
		saveData()
		render()
		$(this).closest('li').removeClass('editing')

	}

	var stateTodo = function(){
		$('.selected').removeClass('selected')
		$(this).addClass('selected')
		state = $(this).text()
		localStorage.state = state
		render()
		return false
	}

	var deletecheckTodo = function(){
		todos = $.grep(todos,function(v){
			return v.isDone===false
		})
		saveData()
		render()
	}


	$('#new-todo').on('keyup',addTodo)
	$('#todo-list').on('click','.destroy',deleteTodo)
	$('#todo-list').on('click','.toggle',checkTodo)	
	$('#todo-list').on('dblclick','li',editTodo)
	$('#todo-list').on('focusout','.edit',saveTodo)
	$('#filters').on('click','a',stateTodo)
	$('#clear-completed').on('click',deletecheckTodo)
	$('#toggle-all').on('click',checkallTodo)
} )