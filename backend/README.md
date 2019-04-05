# HOW TO RUN
1. `pip install -r requirements.txt`
1. `python manage.py makemigrations rest_api`
1. `python manage.py migrate`
1. `pyton3 manage.py runserver`

# Endpoints
all are prefixes with `/api/`  
* `check_in/<card_id>/room/<room_id>/` - POST checks a user into a room  
* `where/<user_id>/` - GET, returns which room is the user in  
CRUD endpoints:  
* `groups`
* `people`
* `rooms`