if(localStorage.contects){
	var contects = JSON.parse(localStorage.contects)
}
else{

var contects = [
	{id:'10001',name:'pink',phone:'18535151001'},
	{id:'10002',name:'yellow',phone:'18535151002'},
	{id:'10003',name:'blue',phone:'18535151003'},
	{id:'10004',name:'red',phone:'18535151004'},
	{id:'10005',name:'green',phone:'18535151005'},	
	{id:'10006',name:'purple',phone:'18535151006'},
	{id:'10007',name:'orange',phone:'18535151007'},	
	{id:'10008',name:'golden',phone:'18535151008'},
	{id:'10010',name:'brown',phone:'18535151009'},
	{id:'10011',name:'red',phone:'18535151010'},
	{id:'10012',name:'green',phone:'18535151011'},	
	{id:'10013',name:'purple',phone:'18535151012'},
	{id:'10014',name:'orange',phone:'18535151013'},	
	{id:'10015',name:'golden',phone:'18535151014'},
	{id:'10016',name:'brown',phone:'18535151015'},
	{id:'10017',name:'brown',phone:'18535151016'},
	{id:'10018',name:'red',phone:'18535151017'},
	{id:'10019',name:'green',phone:'18535151018'},	
	{id:'10020',name:'purple',phone:'18535151019'},
	{id:'10021',name:'orange',phone:'18535151020'},	
	{id:'10022',name:'golden',phone:'18535151021'},
	{id:'10023',name:'brown',phone:'18535151022'}		
]
localStorage.setItem('contects',JSON.stringify(contects))
}
var arr = [],
forEach = arr.forEach,
filter = arr.filter;
var $side = document.getElementsByClassName('side')[0]
var $dl = $side.querySelector('dl')
var $content = document.getElementsByClassName('content')[0]
var $info = document.getElementsByClassName('info')[0] 
var $cancel = document.getElementsByClassName('cancel')[0]
var $confirm = document.getElementsByClassName('confirm')[0]
var names =  document.getElementsByClassName('names')[0]
var phones = document.getElementsByClassName('phones')[0]
var reload = document.getElementsByClassName('reload')[0]

var render = function(){
	$content.innerHTML=''
	var dect = {}
	contects.forEach(function(v){
		var k = v.name[0].toUpperCase()
		if(!dect[k]){
			dect[k]=[]
		}
		dect[k].push(v)	
	})

var b = Object.keys(dect).sort()
b.forEach(function(v){
	var $dd = document.createElement('dd')
	var $dt = document.createElement('dt')
	$dd.className = v
	$dt.innerHTML = v;
	$dt.id = v
	$dd.innerHTML = '<a href="#'+v+'">'+v+'</a>'
	$dl.appendChild($dd)
	$content.appendChild($dt)
	var a = dect[v]
	a.forEach(function(v){
		var a= v.phone		
		var b = a.slice(0,3)
		var c = a.slice(3,7)
		var d = a.slice(7)		
		var $dd = document.createElement('dd')
		$dd.setAttribute('data-id',v.id)
		$dd.innerHTML = '<h5 class="name" data-role="name">'+v.name+'</h5>\
		<h6 class="phone" data-role="phone">'+b+'-'+c+'-'+d+'</h6>'
		$content.appendChild($dd)
	})

})
// var tds = $content.querySelectorAll('dd')
$side.style.height = $dl.firstElementChild.offsetHeight*b.length + 'px'
}
render()

// $side.addEventListener('mousemove',function(e){
// 	var el = e.target
// 	b.forEach(function(v){
// 		if(el.classList.contains('v')){

// 		}
// 	})
	
// })
$info.addEventListener('keyup',function(e){
	var ids = document.querySelector('.edit').getAttribute('data-id')
	var id = Number(ids)
	var el = e.target
	var key = el.parentElement.getAttribute('data-role')
	var value = el.value;
	update(ids,key,value)
	// console.log( el )

})
var update = function(id,key,value){		
		contects.forEach(function(v){
			console.log(v.id)
			if(v.id == id){
				v[key] = value
			}		
		})		
		localStorage.setItem('contects',JSON.stringify(contects));
		// console.table(contects)
	}

$content.addEventListener('touchstart',function(e){
	var el = e.target;
	if( el.nodeName==='H6' || el.nodeName==='H5'){
		$info.style.display = 'block'
		var num = el.parentElement.getAttribute('data-id')		
		var temp = contects.filter(function(v){
			return v.id === num
		})
		names.innerHTML = temp[0].name
		phones.innerHTML = temp[0].phone
	}
	el.parentElement.classList.add('edit')
})
$confirm.addEventListener('touchstart',function(){		
	var edit = document.querySelector('.edit')
	var num = edit.getAttribute('data-id')

	// localStorage.setItem('contects',JSON.stringify(contects))
	render()
	$info.style.display = 'none'

})

$cancel.addEventListener('touchstart',function(){
	var edit = document.querySelector('.edit')
	edit.classList.remove('edit')
	$info.style.display = 'none'
})
$info.addEventListener('touchstart',function(){
	var edit = document.querySelector('.edit')
		$info.style.display = 'none'
		edit.classList.remove('edit')
})
$info.firstElementChild.addEventListener('touchstart',function(e){
	e.stopPropagation()
})
var xinxi = $info.innerHTML

reload.addEventListener('touchstart',function(){
	$info.style.display = 'block'
	names.innerHTML = '<input type="text" value="name" data-role="name"/>'
	phones.innerHTML = '<input type="text" value="phone" data-role="phone"/>'
	// names.classList.add('editing')
	// phones.classList.add('editings')
	var xuehao;
		if( contects.length){
			var aa =(Number(contects[contects.length-1].id)) + 1;
			xuehao = aa.toString()
		}else{
			xuehao = 10001;
		}
		// console.log(xuehao)
	var _d = {id:xuehao,name:'A',phone:''}		
		var ddd = document.createElement('dd')
		ddd.setAttribute('data-id',xuehao)
		contects.push(_d)
		ddd.classList.add('edit')
		$content.appendChild(ddd)
		// console.table(students)
		localStorage.setItem('contects',JSON.stringify(contects))	
		// render()
})



names.addEventListener('touchstart',function(){
	var temp = names.innerHTML
	if(this.classList.contains('editing')){

		var temps = this.querySelector('input').value
		names.innerHTML = temps
		this.classList.remove('editing')
	}else{
		names.innerHTML='<input type="text" value="'+temp+'" />'
		this.classList.add('editing')
	}
	// console.log(this)
})
phones.addEventListener('touchstart',function(){
var temps = phones.innerHTML
if(this.classList.contains('editings')){

		var tempss = this.querySelector('input').value
		phones.innerHTML = tempss
		this.classList.remove('editings')
	}else{
		phones.innerHTML='<input type="text" value="'+temps+'"/>'
		this.classList.add('editings')
	}
	
})

