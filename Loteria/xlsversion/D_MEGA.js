window.onload=function(){create_buttons();};

function setStatus(id){				 
	var els = document.getElementsByName(id);
	if(els != undefined){
		var status = (els[0].style.visibility == 'visible');
		for(var i = 0; i < els.length; i++){
		els[i].style.visibility = ((!status) ? 'visible' : 'hidden');
		}					
	}
	else{
		alert('Elemets not find');
   }						
} 
function a(){alert('OI');}

function create_buttons(){
 var e = document.getElementsByTagName("table")[0];
 var btnuni = document.createElement("button"); 
 btnuni.id='btnuni'
 btnuni.innerHTML = 'Unidades';
 btnuni.onclick = function(){setStatus('uni');return false;};
 var btndez = document.createElement("button"); 
 btndez.id='btndez'
 btndez.innerHTML = 'Dezenas';
 btndez.onclick = function(){setStatus('dez');return false;};
 
 e.parentNode.insertBefore(btndez,e);
 e.parentNode.insertBefore(btnuni,e);
}