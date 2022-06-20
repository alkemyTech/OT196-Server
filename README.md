# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Test accounts for the website
### Principal demo accounts
| Email | Password | Role |
| ------------- | ------------- | ------------- |
| usuarionormal@mail.com  | normal | User
| usuarioadmin@mail.com  | admin | Admin 

### All demo accounts
| Email | Password | Role |
| ------------- | ------------- | ------------- |
| facundoolmedo@mail.com| olmedo | Admin |
| ezequielalmada@mail.com| almada | Admin|
| gerardofernandez@mail.com| fernandez | Admin|
| santiagoperez@mail.com| perez | Admin|
| micaelatorres@mail.com| torres | Admin|
| valentinaaguirre@mail.com| aguirre | Admin|
| sofiamedina@mail.com| medina | Admin|
| ludmilaflores@mail.com| flores | Admin|
| martinabenitez@mail.com| benitez | Admin|
| juanrodriguez@mail.com| rodriguez | User |
| carlosgutierrez@mail.com| gutierrez | User|
| sebastianmendoza@mail.com| mendoza | User|
| martinsanchez@mail.com| sanchez| User|
| julianromero@mail.com| romero | User|
| ceciliasosa@mail.com| sosa | User|
| carlaramirez@mail.com| ramirez | User|
| fernandaruiz@mail.com| ruiz | User|
| esmeraldaherrera@mail.com| herrera | User|