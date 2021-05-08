# covid-vaccine-spot-checker

To set heroku environment vars, create a `production.env` file and then run `heroku config:set $(cat production.env | sed '/^$/d; /#[[:print:]]*$/d')`
