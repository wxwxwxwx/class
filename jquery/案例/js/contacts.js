$(function(){
	var 
	// contacts = [
	// {},
	// {},
	// {},
	// {},
	// ],
	 $cent = $('.cent'),
	 $dl = $('.cent dl'),
	 $side = $('.side'),
	 $ul = $('.side ul'),
	 contacts=[]
	if(localStorage.data){
		contacts = JSON.parse(localStorage.data)
	}else{
		_.ajax('c:/WWW/php/gaincontacts.php',function(data){
			contacts = JSON.parse(data)
			localStorage.data = JSON.stringify(data)
		})
	}
})