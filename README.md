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
docker-compose up -d --force-recreate
```
open in browser `http://localhost:3000`

### Required Config Vars
- `TYPEORM_CONNECTION=mongodb`
- `TYPEORM_DATABASE=__DATABASE_NAME__`
- `TYPEORM_ENTITIES=dist/**/*.entity.js`
- `TYPEORM_HOST=__DATABASE_HOST__`
- `TYPEORM_PASSWORD=__DATABASE_PASSWORD__`
- `TYPEORM_PORT=__DATABASE_PORT__`
- `TYPEORM_USERNAME=__DATABASE_USER__`
- `AUTH_DOMAIN=__AUTH_ISSUER__`
- `AUTH_AUDIENCE=__YOUR_APP_ID__`
- `AUTH_CLIENT_ID=__FE_APP_CLIENT_ID`
- `STATIC_CONTENT_DIRECTORY=../../../../`

You can use `dotenv` for local development, see example [.env](be-all-notes/.env.example) file.
