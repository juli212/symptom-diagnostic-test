# Symptom Diagnosing Test App

This project intends to receive a symptom chosen by a user and return to them the most likely medical diagnosis. If there are multiple highest-frequency diagnoses, one will be chosen at random to be displayed.

The API provided returns a Symptom object or a collection of Symptom objects and each of their nested possible Diagnosis options. Each Diagnosis object has a count attribute which provides the number of times it has been selected as the correct diagnosis for it's associated Symptom.


# Getting started

###### Clone the repo.

        git clone https://github.com/juli212/symptom-diagnostic-test.git

###### Create and activate a development environment. Python uses [virtual environments](http://docs.python-guide.org/en/latest/dev/virtualenvs/) to encapsulate the dependencies for a given project. This project was made using Virtualenvwrapper

        pip install virtualenvwrapper
        mkvirtualenv diagnostic-test-app-env
        workon diagnostic-test-app-env

    https://virtualenvwrapper.readthedocs.io/en/latest/install.html

###### Install Django and the project requirements. Then migrate the database

        pip install django
        pip install -r requirements.txt

        python manage.py makemigrations
        python manage.py migrate

###### Seed database using the symptoms.csv file. You can dump the data inside the interactive shell:

        python manage.py shell

        import csv
        from api.models import Symptom, Diagnosis
        f = open('symptoms.csv')
        reader = csv.reader(f)
        for row in reader:
            s = Symptom(name=row[0])
            s.save()
            row.pop(0)
            for diagnosis in row:
                d = Diagnosis(name=diagnosis, symptom=s)
                d.save() 

###### Install React dependencies and run app

        npm install
        npm start

###### Run Django Server

        python manage.py runserver

###### To create a production build of the React app:

        npm run build


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## React-Django app
Simple setup for a React-Django web app. See tutorial here: https://medium.com/@nicholaskajoh/heres-a-dead-simple-react-django-setup-for-your-next-project-c0b0036663c6.
