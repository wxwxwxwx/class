$(function(){
	var $cent = $('.cent')
	var $dl = $('.cent dl')
	var $side = $('.side')
	var $ul = $('.side ul')
	var contacts=[]
	if(localStorage.data){
		contacts = JSON.parse(localStorage.data)
	}else{
		_.ajax('c:/WWW/php/gaincontacts.php',function(data){
			contacts = JSON.parse(data)
			localStorage.data = JSON.stringify(data)
		})
	}
})