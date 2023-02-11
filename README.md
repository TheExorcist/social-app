
# Project Title

A brief description of what this project does and who it's for

* ruby version: ruby 3.0.0p0 (2020-12-25 revision 95aff21468)

* rails version: Rails 7.0.4.2

* node version: v14.20.1

* npm version: 6.14.17

# Steps to setup the Rails
```
git clone git@github.com:TheExorcist/social-app.git
cd social-app
rvm use 3.0
bundle install
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails s -p 3001 ## frontend uses 3000

## Above app is bundled with the SQLite, just to start fast.

```

# Steps to setup the frontend, react part

```
cd social-app/frontend
nvm use 14
npm install
npm start

```

check on browser `http://localhost:3000`
`Do signup for the first`

Limitations

* Validations are not setup properly, for some part.
* It uses SQLites.
* Rails is not properly setup to render the react build.
* Basic UI.

Please don't mind for the above things.

