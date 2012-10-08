/*** GLOBAL VARIABLES ***/
/**/

/* Utility arrays just to make handling date in a human friendly format easy */

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var months_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/* store information like events in here */
var date_metadata = {};



/*** FUNCTIONS ***/
/**/

/* Generates the boxes for each day of the week at the top
	of the calendar. 
	
	Could be hardcoded but I do it in here
	because adding them in jQuery for some reason makes them line up
	with the calendar boxes while hardcoding them doesn't. Probably 
	something to do with whitespace and inline-blocks */
function generate_dotw_boxes() {

	var dotws = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	for (var i=0; i < 7; i++){
		var i_day = $("<li>");
		
		i_day.attr("class", "dotw-box hidden-phone");
		i_day.append("<p class=\"dotw-label\">"+ dotws[i] +"</p>");
		$(i_day).appendTo("#main-calendar ul:nth-child(1)");
	}
}

/* Generates the boxes for each day (40 in total) for the calendar.
	Makes how many boxes from the previous month should show up,
	then the current month, then the next month, if applicable.
	Also generates the labels for the months on the side. */
function generate_boxes() {
	var d = new Date();
	var d_date = d.getDate();
	var d_month = d.getMonth();
	
	var d_firstday = new Date();	
	//so we can find out what day the first of the month falls on
	d_firstday.setDate(1);
	
	var pre_year = d.getFullYear(); /*set these to current year for now, we'll change them if need be*/
	var cur_year = d.getFullYear();
	var post_year = d.getFullYear();
	
	var days_in_previous_month;
	var pre_month, post_month;
	var pre_month_num, post_month_num;
		
	if (d_month-1 < 0){ /* check if the previous month was in the previous year */
		days_in_previous_month = months_days[11];
		pre_month = months[11];
		pre_month_num = 12;
		pre_year = d.getFullYear() - 1;
	}
	else {
		days_in_previous_month = months_days[d_month-1];
		pre_month = months[d_month-1];
		pre_month_num = d_month; /*since we're storing days in "2-1-1992" format instead of 
										the 0-11 format d_month uses, we would just be 
										doing "d_month - 1 + 1" anyway.*/
	}
	
	if (d_month + 1 > 11){ /* check if the next month is in the next year */
		post_month = months[0];
		post_year = d.getFullYear() + 1;
		post_month_num = 1;
	}
	else {
		post_month = months[d_month+1];
		post_month_num = d_month + 2; //add two to d_month so we get next month in 1-12 instead of 0-12
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
		$("#main-calendar ul:nth-child(2)").append(
			make_day_box(i, pre_month_num, pre_year, false, "box-monthpre")
		);
	}

	/* appends the current month label in an element only visible on a phone */
	$("#main-calendar ul:nth-child(2)").append($("<li>").attr("class","day-box month visible-phone").text(months[d_month]));
	
	//boxes for days in this month
	for (var i=1; i <= months_days[d_month]; i++){
		$("#main-calendar ul:nth-child(2)").append(
			make_day_box(i, d_month+1, cur_year, (d_date == i) ? true : false, "")
		);
	}
	
	if (show_post == 1){
		/* appends the next month label in an element only visible on a phone */
		$("#main-calendar ul:nth-child(2)").append($("<li>").attr("class","day-box month visible-phone").text(post_month));
	}
	
	//boxes for days after this month
	for (var i=1, pre_days = d_firstday.getDay(); i <= 35 - (months_days[d_month] + pre_days);i++){
		$("#main-calendar ul:nth-child(2)").append(
			make_day_box(i, post_month_num, post_year, false, "box-monthpost")
		);
	}
	
	$(".calendar-labels").append($("<li>").attr("class", "month-label spacer hidden-phone"));
	
	if (show_pre == 1){
		/* adds the previous month label for the labels on the side of the calendar */
		$(".calendar-labels").append($("<li>").attr("class", "month-label pre hidden-phone").text(pre_month));
	}
	/* adds the current month label for the labels on the side of the calendar */		
	$(".calendar-labels").append($("<li>").attr("class", "month-label current hidden-phone").text(months[d_month]));
	
	for (var i = 0; i < 2 + (1 - show_pre); i++){ /*empty boxes for spacing*/
		$(".calendar-labels").append($("<li>").attr("class", "month-label hidden-phone"));
	}
	
	if (show_post == 1){
		/* adds the next month label for the labels on the side of the calendar */
		$(".calendar-labels").append($("<li>").attr("class", "month-label post hidden-phone").text(post_month));
	}

}

/* Generates and returns a box corresponding to a day on the calendar.
		var day = day for the box
		var month = month for the box
		var year = year for the box
		var today_flag = true if this day box should be today, false otherwise
		var month_class = the class (if any) to append to the box for the month it belongs to			
*/
function make_day_box(day, month, year, today_flag, month_class) {
	var i_day = $("<li>");
	
	i_day.attr("id", year + "-" + month + "-" + day);
	i_day.attr("class", (today_flag ?  "day-box today" : "day-box") + " " + month_class);
	i_day.attr("onclick", "toggle_active(this)");
	i_day.append("<p class=\"date-label\">"+ day +"</p>");
	
	var bottom_row = $("<div>").attr("class", "bottom-row");
	
	// TODO: check if this date has events, if so fill this in
	var date_items = 0; // <-- this should actually check for the proper value
	bottom_row.append("<span class=\"item-num\">"+ (date_items > 0) ? "" : date_items +"</span>");
	
	var edit_button = $("<span href=\"\" class=\"edit-button\">e</span>");
	edit_button.attr("onclick", "edit_date(this)");
	bottom_row.append(edit_button);
	bottom_row.append("<div style=\"clear:both\"></div>");
	
	i_day.append(bottom_row);
	
	return i_day;
}

function edit_date(day)
{
	alert("you edited it, or not!");
}

/* The routine to make a box activated.*/
function toggle_active(item)
{

	var flag = false;
	//In case the box was already active and we want to 
	//deactivate it.
	if ($(item).hasClass("active")){
		flag = true;
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