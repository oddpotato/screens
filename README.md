# Newspeak House Screens

This runs the screens in the Newspeak House lounge/drawing room.
- Deployed with Netlify
- View on [screens.simmsreeve.com](screens.simmsreeve.com)

## Add a page
1. (optional) Create a new HTML file in this repo
2. Update the `urls = []` variable in `index.html`
3. There is no step 3

## Page display options
There are three parameters that can be used to control the screens Display:
1. `url`: Specify which webpage to display initially by URL (default: first in hardcoded URL list)
2. `index`: Index into hardcoded list of URLs used to select which webpage to display initially (default: 0)
3. `period`: Number of seconds to wait before loading the next item in the hardcoded URL list (default: 0, meaning 'never change page')
Note that the page reloads itself every hour in order to pull in updates deployed via Netlify.

These options can be entered into the URL as in the following examples:
- [screens.simmsreeve.com?url=joe](screens.simmsreeve.com?url=joe) - loads the /joe.html page and never changes
- [screens.simmsreeve.com?index=5](screens.simmsreeve.com?index=5) - loads the 5th page in the hardcoded URL list and never changes
- [screens.simmsreeve.com?period=30](screens.simmsreeve.com?period=30) - loads the 0th page in the hardcoded URL list and cycles to the next item in the list every 30 seconds

These options can be combined, but the use cases for this are limited. The URL parameter takes precedence over the index parameter. If a period parameter is given, both URL and index parameters will have only transient effects as the period parameter causes the pages to change anyway.
