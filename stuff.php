<?php $thisPage="stuff"; ?>
<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content='width=device-width, initial-scale=1' name='viewport'/>
<title>Exclusive Stuff - iSplasher</title>
		<link type="text/css" rel="stylesheet" href="style/style.css"/>
		<script type="text/javascript" language="Javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js">
</script>
</head>
<?php include("static/upperpart.php"); ?>

<p class="title">Exclusive Random Sh!t</p>

<section class="arrow_box_normal">
	<center>
	<h2 class="title2">Milestones</h2>
<div id="milestone">
<div class="milestonetext">
		Dive Into Python 3
<div class="completed green">
	<span style="width: 100%">Completed<span></span></span>
</div>
</div>
<div class="milestonetext">
		<a href="euler.php">Project Euler - 50</a>
<div class="meter orange">
	<span style="width: 16%">16%<span></span></span>
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

<div class="plan">
<table id="plans2" style="margin-top:0; border-bottom:none;">
	<tr>
	<td>C++ Primer, 5th Edition</td>
	<td style="float:right; border-left:1px solid #F63;">
		<div class="smallmeter red">
			<span style="width: 100%">ON-HOLD @ 12,8%</span> <!-- 12.8% -->
		</div>
	</td>
	</tr>
</table>
</div>
<script language="javascript" type="text/javascript">
$(".smallmeter > span").each(function() {
	$(this)
		.data("origWidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("origWidth")
		}, 3500);
});
</script>

<div class="plan">
<h2 class="title2">Planned Stuff</h2>
<table id="plans">
	<tr>
	<td width="2px" style="color: #F63;">*</td>
	<td width="45%">Make an AMV</td>
	<td><b style="color: #F63">When:</b> When i have the time</td>
	</tr>
	<tr>
	<td width="2px" style="color: #F63;">*</td>
	<td width="45%">My Big Software Project</td>
	<td><b style="color: #F63">When:</b> Can fluently program programs</td>
	</tr>
	<tr>
	<td width="2px" style="color: #F63;">*</td>
	<td width="45%">Read: <a href="http://www.ccs.neu.edu/home/matthias/HtDP2e/Draft/index.html">
					How to Design Programs</a></td>
	<td><b style="color: #F63">When:</b> Done reading the Python book</td>
	</tr>
	<tr>
	<td width="2px" style="color: #F63;">*</td>
	<td width="45%">Make a 3D mascot for an OS</td>
	<td><b style="color: #F63">When:</b> I reach expert level in programming</td>
	</tr>
	<tr>
	<td width="2px" style="color: #F63;">*</td>
	<td width="45%">Read: SICP</td>
	<td><b style="color: #F63">When:</b> Sometime in the far future</td>
	</tr>
</table>
</div>

<div id="list2">
	<ol>
		<li>Links
			<ol>
				<li><a href="http://www.github.com/isplasher" target="_blank">GitHub - iSplasher</a></li>
				<li><a href="http://www.projecteuler.net" target="_blank">Project Euler</a></li>
				<li><a href="http://www.4chan.org/g/" target="_blank">/g/ - 4Chan</a></li>
				<li><a href="http://www.reddit.com" target="_blank">Reddit</a></li>
				<li><a href="http://www.cppreference.com" target="_blank">C++ Reference</a></li>
				<li><a href="aarhus.php">Aarhus Gymnasium</a></li>
				<li><a href="../gymnasium/Kærlighedsfilm/Kærlighedsfilm.html">Kærlighedsfilm</a></li>
				<li><a href="old.php">Old Page</a></li>
	</ol>
</li>
</ol>
<ol>
		<li>Social Networks
			<ol>
				<li><a href="http://www.facebook.com/isplasher" target="_blank">Facebook - iSplasher</a></li>
				<li><a href="http://www.isplasher.deviantart.com" target="_blank">DeviantArt - iSplasher</a></li>
				<li><a href="http://www.twitter.com/isplasher" target="_blank">Twitter - @isplasher</a></li>
	</ol>
</li>
</ol>
</div>
</section>

<?php include("static/footer.php"); ?>