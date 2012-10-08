#Web-based calendar application

##What is it
It's a web-based calendar app!
More specifically it's a calendar made using javascript(with jQuery) and HTML/CSS. 

So far it's all client-side but one day it may include server-side features, you'll see!

##How it works
I will fill this out

##To-do
*	Fill that thing out above
*	Events
*	Saving events to local storage
*	Server-side stuff, for example saving events to the cloud
*	Alerts, possibly by email
*	Make this a chrome app or something

##Developer's notes

###Spacing the month labels on the left side
This was originally done by setting the height of each label-element to be an amount based on the css 'em' value, which would be a value relative to the parent node's font-size, this way I could just change the font-size for that parent in the responsive css and it would all just work in a brilliant way, sort of. Later on I let go of being kind of proud for figuring out that workaround and realized that I could just add in empty boxes for spacing, this was better tuned to handle the responsive css -- with the 'em' method I had to approximate things that were constant between screen sizes like margins, so that it would look consistent, with the empty boxes method things like the margins would stay the same and work the same as the day-boxes grid would, which was what I was aligning the labels to anyway.

###The odd resolution breaks in responsive.css
You may have noticed that the different criteria in responsive.css for max-width are in odd increments -- below 555, between 555 and 960, between 960 and 1150 -- the reason for this is that these responsive areas are designed not only for things like phones (where you would expect me to use something like 480, 767, etc) but also different sizes of the browser. The site as I laid it out  would break if I used more common resolutions in responsive.css to distinguish between viewing points (phone, tablet, computer), if you resized your browser window you could find a part where the layout gets all screwed up. I figured it would be easier to just set four different tiers of sizes for the layout and set the start for each as the point just before the layout would break if you resized it to that width.