// (function(){
// 	var chuli = function(str){
// 		return '.'+str
// 	}
// 	var wQuery = function(selector){
// 		var a = chuli(selector)
// 		if(document.querySelector){
// 			return document.querySelector(a)
// 		}
// 	}
// 	window.$ = wQuery
// })()
// var $ = function(selector){
// 	return document.querySelector(selector)
// }
// (function(){
// 	var jQuery = function(selector){
// 		var els = document.querySelectorAll(selector)
// 		for(var i=0;i<els.length;i++){
// 			this[i] = els[i]
// 		}
// 		this.length = els.length
// 	}
// 	jQuery.prototype.addClass = function(str){
// 		for( var i=0;i<this.length;i++ ){
// 			this[i].classList.add(str)
// 		}
// 	}
// 	var wQuery = function(selector){
// 		return new jQuery(selector)
// 	}
// 	window.$ = wQuery
// })()
(function(){
	var jQuery = function(selector){
		var els = document.querySelectorAll(selector)
		for( var i = 0;i<els.length;i++ ){
			this[i] = els[i];
		}
		this.length = els.length
	}
	jQuery.prototype.addClass = function(str){
		for( var i = 0;i<this.length;i++){
			this[i].classList.add(str)
		}
	}
	// jQuery.prototype.addClass = function(str){
	// 	for( var i = 0;i<this.length;i++){
	// 		this[i].classList.remove(str)
	// 	}
	// }
	var a = function(selector){
		return new jQuery(selector);
	}
	window.$ = a
})()