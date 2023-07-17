# Research

## Table of Contents
- [BLOC](#bloc)
- [Twitter API & Scraping](#twitter-api---scraping)
  * [Twitter Scrapers](#twitter-scrapers)
  * [Twitter API and Endpoints](#twitter-api-and-endpoints)
- [Website Tasks](#website-tasks)
- [Misc](#misc)

## BLOC

## Twitter API & Scraping

### Twitter Scrapers

#### [snscrape](https://github.com/JustAnotherArchivist/snscrape) Social Media Scraper
Currently not functioning for Twitter due to new restrictions on accounts. 
Has a few [potential fixes](https://github.com/JustAnotherArchivist/snscrape/issues/996) but developer will not be updating until “the dust settles.”

#### [Nitter](https://github.com/zedeus/nitter) Twitter Scraper
Requires compiling the scraper and running it as an application, stores data in a Redis database. 
Has an ongoing conversation about fixing the scraper, along with some scripts that offer a temporary fix but there is no stability at the moment.
Requires Redis running as well and is more targeted as an alternative front-end, meaning there is not an API built in
Seems like there are some Python modules like [nitter-scraper](https://pypi.org/project/nitter-scraper/) that aim to bridge the gap, but none of them have been updated recently so its uncertain as to their success.
Has a very active community of developers working to keep it functional, not targeted towards API or scraping purposes but the goals overlap.

#### [Nitter Scraper](https://pypi.org/project/nitter-scraper/)
Self-contained Python module for using Nitter as a scraper-as-API tool.
Handles the Docker composition and Redis server automatically as part of the module.
Repo is no longer maintained and does not appear functional (API errors when attempting to query anything).

#### [Twint](https://github.com/twintproject/twint)
Repository is no longer maintained and was archived in March, but hasn’t had active development since 2019.
Was not working prior to the the Twitter API changes, so definitely too broken as of the most recent changes.

#### [Scweet](https://github.com/Altimis/Scweet)
Still running into trouble with getting it to work but seems to have an active community with some forks and pull requests that were working as of June.

#### [WIP Script](https://github.com/zedeus/nitter/issues/919#issuecomment-1620918391)
Based on the work of the above user, but several problems seem to exist with it.
* Data format appears inconsistent between users, meaning even giving a different username can break the whole script - not robust.
* Has a lot of excess data not used by the BLOC algorithm but lacks some of the required data for BLOC.
Is based on a complex system of mixing the v1.1 and v2 endpoints with odd bearer tokens which gives it a high likelihood of failure with no support when that occurs.

### Twitter API and Endpoints

#### GraphQL
This is the method Nitter is using currently.
Seems to be the most consistent method of access at the moment with the most data available.

#### Embedded tweets
Requires the Tweet ID to search, which cannot be gathered through the embedded Tweets endpoint.
These do appear functional still to gather Tweet information, but it lacks data required for some content alphabets.

#### Syndication timeline
Possibly link with embedded tweets as a means of getting Tweet IDs, although this appears to show no data.

## Website Tasks

#### Local Tweet Upload

## Misc
