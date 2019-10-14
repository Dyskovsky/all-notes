# all-notes

Best place for keeping all your notes!

## Swagger

You can test the backend using swagger ui available at http://localhost:3000/swagger (local environment)

## Deploying 

### Heroku

#### Pushing Docker Image
```
heroku container:push web
heroku container:release web
heroku open
```
 
#### heroku.yml (Build Docker image remote)
```
git add heroku.yml
git commit -m "Add heroku.yml"
heroku stack:set container
git push heroku master
```


### Local
```
docker build -t pjo/all-notes .
cd infrastructure/local
docker-compose up -d
```

### Required Config Vars
- `TYPEORM_CONNECTION=mongodb`
- `TYPEORM_DATABASE=__DATABASE_NAME__`
- `TYPEORM_ENTITIES=be-all-notes/dist/**/*.entity.js`
- `TYPEORM_HOST=__DATABASE_HOST__`
- `TYPEORM_PASSWORD=__DATABASE_PASSWORD__`
- `TYPEORM_PORT=__DATABASE_PORT__`
- `TYPEORM_USERNAME=__DATABASE_USER__`
