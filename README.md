# em_app
App to assist in documenting incidents for emergency managers

# Starting the frontend web app ( React )
- cd packages/frontend
- npm run dev

# Starting the backend Server ( Django )
- cd packages/backend
- .\venv\Scripts\activate
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py createsuperuser
- python manage.py runserver 0.0.0.0:8000
