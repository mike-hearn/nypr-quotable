#!/usr/bin/env sh

s3cmd sync * --acl-public --exclude "*sass-cache*" --exclude "*node_modules*" --exclude "*bower_comp*" --delete-removed s3://nyprdocs/Hosted-Files/nypr-quotable/
