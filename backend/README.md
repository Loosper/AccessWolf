# HOW TO RUN
1. `pip3 install -r requirements.txt`
1. `python3 manage.py makemigrations rest_api`
1. `python3 manage.py migrate`
1. `python3 manage.py runserver`  
optional:
`python3 manage.py createsuperuser` to give yourself access to the admin page (in `/admin`)

# Endpoints
all are prefixes with `/api/`  
* `check_in/<card_id>/room/<room_id>/` - POST checks a user into a room  
* `where/<user_id>/` - GET, returns which room is the user in  
CRUD endpoints:  
* `groups`
* `people`
* `rooms`