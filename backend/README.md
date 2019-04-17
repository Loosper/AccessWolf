# HOW TO RUN
1. `pip3 install -r requirements.txt`
1. `python3 manage.py makemigrations rest_api`
1. `python3 manage.py migrate`
1. `python3 manage.py runserver`
1. `python3 manage.py loaddata fixtures/initial.json`  
optional:
`python3 manage.py createsuperuser` to give yourself access to the admin page (in `/admin`)

# Endpoints
all are prefixed with `/api/`  
#### `check_in/<card_id>/room/<room_id>/`  
POST - checks a user into a room by _card id_  
data - none  
#### `where/<user_id>/`  
*GET* - returns which room is the user in  
data:  
* id - id of room where the user is  
* name - name of room. Will be null if never seen  
* active - is the user in the room _right now_  
* last_seen - check in time if active, last time user was seen if not  
### full CRUD endpoints:  
GET  - `/` - list  
POST - `/` - create  
GET  - `/<id\>/` - inspect  
####  `groups/`  
####  `people/`  
####  `rooms/`  
returns an additional field pople, with a list of all people in the room  
####  `events/`  
`events/<id>/attendance` - returns people who are/were at the event, as well as whether they are late  
NOTE: list only returns number of people invited  