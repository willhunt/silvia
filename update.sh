#!/bin/sh

# gnome-terminal -e "sh -c 'git fetch --all; sleep 2; git reset --hard origin/master; sleep 1; \
#     chmod g+w silvia/db.sqlite3 silvia/celery.sqlite; sleep 1; \
#     chgrp server_group silvia/db.sqlite3 silvia/celery.sqlite; sh'"

git fetch --all
sleep 2
git reset --hard origin/master
sleep 1
chmod g+w silvia/db.sqlite3 silvia/celery.sqlite
sleep 1
chgrp server_group silvia/db.sqlite3 silvia/celery.sqlite

# gnome-terminal \
# --tab -e "sh -c 'roscore; sh'" \
# --tab -e "sh -c 'sleep 2; source devel/setup.bash; roslaunch myrobot_main main.launch; sh'" \
# --tab -e "sh -c 'sleep 2; roslaunch myrobot_markers markers.launch; sh'" \
# --tab -e "sh -c 'sleep 2; roslaunch myrobot_pick pick.launch; sh'"