var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var months_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/* Generates the boxes for each day of the week at the top
	of the calendar. 
	
	Could be hardcoded but I do it in here
	because adding them in jQuery for some reason makes them line up
	with the calendar boxes while hardcoding them doesn't. Probably 
	something to do with whitespace and inline-blocks */
function generate_dotw_boxes (){

	var dotws = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	for (var i=0; i < 7; i++){
		var i_day = $("<li>");
		
		i_day.attr("class", "dotw-box hidden-phone");
		i_day.append("<p class=\"dotw-label\">"+dotws[i]+"</p>");
		$(i_day).appendTo("#main-calendar ul:nth-child(1)");
	}
}

/* Generates the boxes for each day (40 in total) for the calendar.
	Makes how many boxes from the previous month should show up,
	then the current month, then the next month, if applicable.
	Also generates the labels for the months on the side. */
function generate_boxes (){
	var d = new Date();
	var d_month = d.getMonth();
	
	var d_firstday = new Date();	
	//so we can find out what day the first of the month falls on
	d_firstday.setDate(1); 	
	
	//just test values for debugging
	/*
	var test_d1 = 3;
	var test_d2 = 4;
	*/
	
	if (d_month-1 < 0){ /* check if the previous month was in the previous year */
		var days_in_previous_month = months_days[11];
		var pre_month = months[11];
	}
	else {
		var days_in_previous_month = months_days[d_month-1];
		var pre_month = months[d_month-1];
	}
	
	if (d_month + 1 > 11){ /* check if the next month is in the next year */
		var post_month = months[0];
	}
	else {
		var post_month = months[d_month+1];
	}
	
	/*flags for the month labels on the side, just for if they should be visible or not*/
	var show_pre = 0;
	var show_post = 0;
	
	if (d_firstday.getDay() > 0){ /*if yes, we should show the previous month label*/
		show_pre = 1;
	}
	
	var d_lastday = new Date();	
	//so we can find out what day the last of the month falls on
	d_lastday.setDate(months_days[d_month]); 	
	
	if (d_lastday.getDay() < 6){ /*if yes, we should show the next month label*/
		show_post = 1;
	}
	
	if (show_pre == 1){
		/* appends the previous month label in an element only visible on a phone */
		$("#main-calendar ul:nth-child(2)").append($("<li>").attr("class","day-box month visible-phone").text(pre_month));
	}
	
	//making the boxes for days before this month
	for (var i = days_in_previous_month  - d_firstday.getDay() + 1; i < days_in_previous_month + 1; i++){
		var i_day = $("<li>");
		
		i_day.attr("class", "day-box box-monthpre");
		i_day.attr("onclick", "toggle_active(this)");
		i_day.append("<p class=\"date-label\">"+ i +"</p>");
		$(i_day).appendTo("#main-calendar ul:nth-child(2)");
	}

	/* appends the current month label in an element only visible on a phone */
	$("#main-calendar ul:nth-child(2)").append($("<li>").attr("class","day-box month visible-phone").text(months[d_month]));
	//boxes for days in this month
	for (var i=1; i <= months_days[d_month]; i++){
		var i_day = $("<li>");
		
		i_day.attr("class", "day-box");
		i_day.attr("onclick", "toggle_active(this)");
		i_day.append("<p class=\"date-label\">"+i+"</p>");
		$(i_day).appendTo("#main-calendar ul:nth-child(2)");
	}
	
	if (show_post == 1){
		/* appends the next month label in an element only visible on a phone */
		$("#main-calendar ul:nth-child(2)").append($("<li>").attr("class","day-box month visible-phone").text(post_month));
	}
	
	//boxes for days after this month
	for (var i=1; i <= 35 - (months_days[d_month] + d_firstday.getDay());i++){
		var i_day = $("<li>");
		
		i_day.attr("class", "day-box box-monthpost");
		i_day.attr("onclick", "toggle_active(this)");
		i_day.append("<p class=\"date-label\">"+i+"</p>");
		$(i_day).appendTo("#main-calendar ul:nth-child(2)");
	}
	

	
	if (show_pre == 1){
		/* adds the previous month label for the labels on the side of the calendar */
		$(".calendar-labels > .pre > span").text(pre_month);
	}
	

	/* adds the current month label for the labels on the side of the calendar */	
	$(".calendar-labels > .current > span").text(months[d_month]);
	
	if (show_post == 1){
		/* adds the next month label for the labels on the side of the calendar */
		$(".calendar-labels > .post > span").text(post_month);

	}
	
	/* we set the spacing of the labels on the side using 'em', the ul (their parent) font-size
		is set to the height of the calendar boxes in each responsive tier, this way we just
		set the font-size in the responsive.css to be what the height of the boxes are and it applies
		for all sizes, easy! */
	$(".calendar-labels > .pre").css("height",(show_pre)+ "em");
	/* 	I use (1-show_pre) to account for whether this month label should be big enough
			to account for not having the previous month label.
		The 3.25 part is to simulate three rows of day boxes on the calendar plus a bit for the padding
			and borders and such, not elegant but it's simple. */
	$(".calendar-labels > .current").css("height",((1 - show_pre) + 3.25) + "em");
		
	
	
}

/* The routine to make a box activated.*/
function toggle_active(item)
{
	//In case the box was already active and we want to 
	//deactivate it.
	if ($(item).hasClass("active")){
		var flag = true;
	}
	
	$(".day-box.active").removeClass("active");
	if (!flag){ //if it wasn't already active, make it active
		$(item).addClass("active");
	}
}

$(document).ready(function() {
	generate_dotw_boxes();
	generate_boxes();
});