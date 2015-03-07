<?php $thisPage="fight"; ?>
<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content='width=device-width, initial-scale=1' name='viewport'/>
<title>&#x2694; Fight Arena &#x2694; - iSplasher</title>
		<link type="text/css" rel="stylesheet" href="style/style.css"/>
		<script type="text/javascript" language="Javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js">
</script>
</head>
<?php include("static/upperpart.php"); ?>

<p class="title">&#x2694; Bloody Fight Club Arena &#x2694;</p>

<section class="arrow_box_normal">
	<center>
	<h2 class="title2">&#x2694; AMV Battle</h2>
	<div id="milestone">
<div class="milestonetext">
		Dage tilbage:
<div class="meter orange">
	<span style="width: 100%">0 dage</span>
</div>
</div>
</div>
</center>
<script language="javascript" type="text/javascript">
$(".meter > span").each(function() {
	$(this)
		.data("origWidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("origWidth")
		}, 3500);
});
</script>
<div id="list2">
	<ol>
		<li>Regler:
			<ol>
				<li>Deadline: <span style="color: red">Sunday - 1 March</span></li>
				<li>Tema: <span style="color: red">"Badass"/Action</span></li>
				<li>Varighed: <span style="color: red">4,5 minutter GIVE OR TAKE</span></li>
				<li>Anime du må bruge: <span style="color: red">Uendelig</span></li>
				<li>Programmer du må bruge: <span style="color: red">Uendelig</span></li>
				<li>Sange du må bruge: <span style="color: red">Uendelig</span></li>
	</ol>
</li>
</ol>
</div>
</section>

<?php include("static/footer.php"); ?>