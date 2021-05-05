#!/bin/sh
docker exec mongo sh -c 'mongodump --archive --gzip' > /project/mongo-backup/backup-`date +%F_%R`.tar.gz