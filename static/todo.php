<input type="button" id="todoBT">
<div class="todo">
	<span class="todoCONTENT">
		<table>
			<caption>My TO-DO List</caption>
			<tr>
			<th style="color:#F63;">•</th>
			<th style="font-size:95%">Renovate the Project Euler code view</th>
			</tr>
			<tr>
			<tr>
			<th style="color:#F63;">•</th>
			<th style="font-size:95%">Make a music section, with feeds<br>
										from SoundCloud
			</th>
			</tr>
			<tr>
			<th style="color:#F63;">•</th>
			<th>Make everything dynamic</th>
			</tr>
			<tr>
			<th style="color:#F63;">•</th>
			<th><s>Finish the TO-DO list</s></th>
			</tr>
		</table>
</span>
	</div>
	<script language="javascript" type="text/javascript">
	$(function() {
	$("#todoBT").click(function() {
		$(".todo").toggleClass("box-change");
	});
});
	</script>