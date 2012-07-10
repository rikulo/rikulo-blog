#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u"Various"
SITENAME = u"Rikulo Blog"
SITEURL = 'blog.rikulo.org'

MAINSITE = '173.203.80.173'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG='en'

CSS_FILE = ["blog.css", "pygment.css"]

FEED_RSS = "feeds/all.rss.xml"

THEME = "rikulo-theme"

DEFAULT_PAGINATION = 7
RELATIVE_URL = True
STATIC_PATHS = ["files"]

ARTICLE_URL = 'posts/{date:%Y}/{date:%b}/{category}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%b}/{category}/{slug}/index.html'



