#!/bin/bash
# This script is loaded onto the pis that run the screens
# This script is fetched at the startup of each pi (to pull updates)
# The actual kiosk script on the pis is as follows:
#
# wget -O kiosk2.sh raw.githubusercontent.com/nwspk/screens/master/kiosk.sh
# chmod +x kiosk2.sh
# ./kiosk2.sh

xset s noblank
xset s off
xset -dpms
 
unclutter -idle 0.5 -root &
 
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
 
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk https://nwspk.github.io/screens/ &
 
while true; do
   xdotool keydown ctrl+Tab; xdotool keyup ctrl+Tab;
   sleep 10
done
 
