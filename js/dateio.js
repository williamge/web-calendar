/* store information like events in here */
var date_metadata = { 	"version": 0.1,
						"dates" : {},
	};

function dateio_save_event(date_id, date_desc)
{
	if (date_id in date_metadata.dates)
	{
		date_metadata.dates[date_id].date_desc.push(date_desc);
	}
	else {
		date_metadata.dates[date_id] = { "date_desc" : [date_desc]};
	}
}

function dateio_get_item_num(date_id)
{
	return (date_id in date_metadata.dates) ? date_metadata.dates[date_id].date_desc.length : 0;
}