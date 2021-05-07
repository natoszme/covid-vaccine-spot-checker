# covid-vaccine-spot-checker

To set heroku environment vars, create a `local.env` file and then run `heroku config:set $(cat local.env | sed '/^$/d; /#[[:print:]]*$/d')`
