#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u"Various"
SITENAME = u"Rikulo Blog"
SITEURL = 'http://blog.rikulo.org'

MAINSITE = 'rikulo.org'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG='en'

CSS_FILE = ["blog.css", "pygment.css"]

FEED_RSS = "feeds/all.rss.xml"

THEME = "rikulo-theme"

DEFAULT_PAGINATION = 7
RELATIVE_URL = True
#STATIC_PATHS = ["files"]

ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{category}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{category}/{slug}/index.html'



