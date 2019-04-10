pip3 install -r requirements.txt
python3 manage.py makemigrations rest_api
python3 manage.py migrate
python3 manage.py loaddata fixtures/initial.json
python3 manage.py runserver
