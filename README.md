# Newspeak House Screens

This runs the screens in the Newspeak House lounge/drawing room.
- Deployed with Github Pages
- View on [nwspk.github.io/screens/](https://nwspk.github.io/screens/)

## Add a page
1. (optional) Create a new HTML file in this repo
2. Update the `urls = []` variable in `index.html`
3. There is no step 3

## Page display options
There are three parameters that can be used to control the screens Display:
1. `url`: Specify which webpage to display initially by URL (default: first in hardcoded URL list)
2. `index`: Index into hardcoded list of URLs used to select which webpage to display initially (default: 0)
3. `period`: Number of seconds to wait before loading the next item in the hardcoded URL list (default: 0, meaning 'never change page')
Note that the page reloads itself every quarter of an hour in order to pull in updates deployed via Netlify.

These options can be entered into the URL as in the following examples:
- [nwspk.github.io/screens/?url=/joe.html](https://nwspk.github.io/screens/?url=/joe.html) - loads the /joe.html first
- [nwspk.github.io/screens/?index=5](https://nwspk.github.io/screens/?index=5) - loads the 5th page in the hardcoded URL list
- [nwspk.github.io/screens/?index=5&period=0](https://nwspk.github.io/screens/?index=5&period=0) - loads the 5th page in the hardcoded URL list and never changes
- [nwspk.github.io/screens/?period=30](https://nwspk.github.io/screens/?period=30) - loads the 0th page in the hardcoded URL list and cycles to the next item in the list every 30 seconds

These options can be combined, but the use cases for this are limited. The URL parameter takes precedence over the index parameter. If a period parameter is given, both URL and index parameters will have only transient effects as the period parameter causes the pages to change anyway.
