# API Encuestas Estudiantes (JWT + Docker)

API RESTful para la gestión de encuestas y votaciones del Centro de Estudiantes. Permite a los administradores crear encuestas complejas y a los estudiantes responderlas de forma segura.

## 🚀 Características

-   **Autenticación**: JWT (JSON Web Tokens) con roles (`student`, `admin`).
-   **Base de Datos**: MongoDB (Persistencia de datos).
-   **Caché**: Redis (Optimización de lectura de encuestas).
-   **Contenedorización**: Docker y Docker Compose para un despliegue fácil.
-   **Documentación**: Swagger UI integrado.

## 📋 Prerrequisitos

-   [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/).
-   (Opcional) Node.js v18+ si deseas correrlo sin Docker.

## 🛠️ Instalación y Ejecución (Recomendado con Docker)

1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone https://github.com/Nylarion/Centro-de-estudiantes.git
    cd apiJWTEncuestasEstudiantes
    ```

2.  **Configurar Variables de Entorno**:
    El proyecto ya incluye un archivo `.env` base, pero asegúrate de que exista.
    
3.  **Levantar el Proyecto**:
    Ejecuta el siguiente comando para construir y levantar los contenedores (API, Mongo, Redis):
    ```bash
    docker compose up --build
    ```

4.  **Verificar**:
    -   La API estará corriendo en: `http://localhost:3000`
    -   MongoDB estará expuesto en: `localhost:27018`
    -   Redis estará expuesto en: `localhost:6380`

## 📖 Documentación de la API (Swagger)

Una vez que el servidor esté corriendo, visita la siguiente URL para ver la documentación interactiva y probar los endpoints:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Desde ahí podrás:
-   Registrar usuarios.
-   Loguearte para obtener el Token Bearer.
-   Crear, listar, responder y eliminar encuestas.

## 🧪 Pruebas Manuales

Se incluye un archivo `crud_completo.txt` en la raíz del proyecto con ejemplos de JSON para probar todos los endpoints manualmente en Postman o Insomnia.

## 📂 Estructura del Proyecto

```
apiJWTEncuestasEstudiantes/
├── config/             # Configuraciones (Redis, Swagger)
├── middleware/         # Middlewares (Auth, Roles)
├── models/             # Modelos Mongoose (User, Survey, Answer)
├── routes/             # Rutas de la API (Auth, Surveys)
├── server.js           # Punto de entrada del servidor
├── Dockerfile          # Configuración de la imagen Docker
├── docker-compose.yml  # Orquestación de servicios
└── README.md           # Este archivo
```

## ⚠️ Notas Importantes

-   **Persistencia**: Los datos de MongoDB se guardan en un volumen de Docker (`mongo-data`). Si borras el volumen, pierdes los datos.
-   **Admin**: Para crear encuestas, necesitas un usuario con rol `admin`. Regístrate normalmente y luego cambia el rol manualmente en la base de datos (usando MongoDB Compass en `localhost:27018`) o usa un script de seed (no incluido por defecto).

---
Desarrollado para el Centro de Estudiantes.
