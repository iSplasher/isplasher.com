<!--
function toggleMe(a){
 var evt=window.event||arguments.callee.caller.arguments[0];
 var obj=window.event?evt.srcElement:evt.target;
 if(obj.nodeType==3) obj=obj.parentNode;
var e=document.getElementById(a);
if(!e)return true;
if (e.style.display == "none") {
    e.style.display = "block"
   obj.innerHTML=obj.innerHTML.replace('Show code','Hide code');
}
else {
    e.style.display = "none"
   obj.innerHTML=obj.innerHTML.replace('Hide code','Show code');
}
return true;
}

function toggleAll(p,a){
 for (var z0=1;document.getElementById(p+z0);z0++){
  document.getElementById('para'+z0).style.display=a?'block':'none';
 }
}

$(".meter > span").each(function() {
	$(this)
		.data("origWidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("origWidth")
		}, 1200);
});
		//-->