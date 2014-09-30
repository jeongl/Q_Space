# Q-Space


This repo is for a site that scrapes brainyquote.com daily and returns 10 quotes from it. I like quotes and wanted to create and share a space for daily contemplation. The idea is to keep it simple with a single login and allow the user one vote per day. I'm thinking of adding a comments box per quote.

ToDos:

 * Create login route & front end bindings, allow a logged in user one vote.
 * Work on styling again
 * Possibly add comments
 * Allow users to view quotes from past days.

### Stuff used to make this:

 * request - for model fetch / save
 * mysql DB
 * mongo - second DB, just mirrors what's saved in mysql
 * cheerio - for scraping
 * bootstrap
 * async - used to scrape a collection of links from the front page
