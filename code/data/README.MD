## How to work with psql
https://www.manniwood.com/topics/psql.html
https://www.tutorialspoint.com/postgresql/index.htm
https://sqlizer.io/#/

## Task
- Feed in data into database and export file.

## Execute Script

psql -U username -d myDataBase -a -f script.sql
psql -U ctp_user -d piecemeal_development -a -f script.sql

## Import/Export

### Import
pg_dump -U USERNAME DBNAME > dbexport.pgsql
pg_dump -U ctp_user piecemeal_development > dbexport.pgsql

### Export
pg_dump -U USERNAME DBNAME > dbexport.pgsql
pg_dump -U ctp_user piecemeal_development > dbexport.pgsql