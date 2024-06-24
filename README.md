# Surti Solicitudes Backend

Este es el backend de un aplicativo web para el manejo de solicitudes internas del almacén "El Surtidor".

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

1. **Node.js**: Descárgalo e instálalo desde [nodejs.org](https://nodejs.org/).
2. **MySQL**: Descárgalo e instálalo desde [mysql.com](https://www.mysql.com/).

### Instalación de Node.js

Para verificar la instalación de Node.js, abre una terminal y ejecuta:

```sh
node -v
````
Deberías ver la versión de Node.js instalada.

### Instalación de MySQL

Para verificar la instalación de MySQL, abre una terminal y ejecuta:

```sh
mysql --version
````
Deberías ver la versión de MySQL instalada.

### Configuración de MySQL
1. **Inicia sesión en MySQL:**
```sh
mysql -u root -p
````
2. **Crea un nuevo usuario y otorga permisos:**
```sql
CREATE USER 'tu_usuario'@'%' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'tu_usuario'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
````
Asegúrate de reemplazar 'tu_usuario' y 'tu_contraseña' con tus propios valores.

### Clonar el Repositorio
Clona el repositorio en tu máquina local:

```sh
git clone https://github.com/wfgp12/surti-solicitudes-back.git
cd surti-solicitudes-back
````
### Configuración del Entorno
Renombra example.env a .env:
```sh
cp example.env .env
````
Abre .env y rellena los valores necesarios con tus configuraciones. Aquí tienes un ejemplo:
```makefile
DB=nombre de la base de datos creada para el proyecto
DB_USER=usuario para poder acceder a la base de datos
DB_PASSWORD=contraseña de usuario para poder realizar la conexion a la base de datos
DB_HOST=el host de tu base de datos
DB_PORT=tu puerto de la base de datos

SECRET_KEY=clave secreta para encriptar datos
````
### Instalación de Dependencias
Instala las dependencias del proyecto con el siguiente comando:

```sh
npm install
````
### Ejecución del Servidor
Inicia el servidor con el siguiente comando:

```sh
npm start
````
El servidor debería estar corriendo en http://localhost:3000.

## Scripts Disponibles
npm start: Inicia el servidor en modo producción.
npm run dev: Inicia el servidor en modo desarrollo con nodemon.




