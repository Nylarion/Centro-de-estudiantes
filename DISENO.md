# Diseño Funcional y Técnico

## Índice

1. [Diseño Funcional](#1-diseño-funcional)
2. [Diseño Técnico](#2-diseño-técnico)

## 1. Diseño Funcional

### 1.1 INTRODUCCION

#### Objetivo: 
El objetivo de la página web es implementar un sistema de encuestas centrado para el estudiante, sustituyendo las herramientas externas que dificultan
y desorganizan la recolección de datos, garantizando el control total y centralizando de dicha información, ofreciendo una interfaz intuitiva y administrable.

#### Alcance:
El proyecto se limitara a construir el núcleo del sistema autónomo, enfocándose en la usabilidad administrativa y la centralización de datos, asi dejando en futuras mejoras las integraciones y funcionalidades de de personalización.

#### Definiciones y acrónimos:
RF: Requisito Funcional.
RNF: Requisito No Funcional.
MVP: Producto Mínimo Viable.
CE: Centro de Estudiantes.
Email Institucional: Correo electrónico proporcionado por la universidad a sus estudiantes y/o profesores.


### 1.2 DESCRIPCIÓN GENERAL

#### Resumen del sistema:
Este proyecto consiste en el diseño e implementación de un sistema de encuestas cuyo proposito principal es sustituir las herramientas externas como Google Forms, evitando la desorganización de datos y falta de control en la gestión de la opinión estudiantil.

#### Contexto y entorno: 
El contexto en el que se va a usar el sistema de encuestas va a ser un entorno estudiantil, dentro de las carreras de la Universidad, 
para saber la opinión de los estudiantes acerca de los temas que proponen los integrantes de la directiva. El entorno solo sera universitario,
ya que el sistema esta pensado solamente para que se pueda utilizar con estudiantes universitarios, aunque el sistema en un futuro se puede escalar a
otros ambientes, en donde uno de los cuales seria mas util es el laboral.

### Usuarios y roles:
Los usuarios y roles que cada uno va a disponer o va a tener son:

#### Estudiante:

- Estudiantes de la facultad registrados.
- Permisos: Ver información, votar encuestas.

#### Administrador:

- Miembros directivos del centro de estudiantes.
- Permisos: Gestión completa del sistema, moderación de contenido.

### 1.3 REQUISITOS FUNCIONALES:

#### Funcionalidad 1
	Autenticación y Autorización
- Descripción detallada
	El sistema debe gestionar el acceso de los usuarios, exigiendo el registro mediante la validación de credenciales con correo institucional para garantizar que solo estudiantes de la facultad accedan y voten. Debe diferenciar entre los roles de Administrador y Estudiante.

- Caso de uso o escenario: Un estudiante se registra por primera vez y obtiene su acceso.
	- Paso 1:
		El usuario accede al formulario de registro, ingresa su nombre completo y su correo electrónico institucional.
	- Paso 2:
		El sistema verifica el formato del email y una vez confirmado le asigna el rol de Estudiante y permite el inicio de sesión seguro.

#### Funcionalidad 2
	Gestión de encuestas y Votación
- Descripción detallada
	El sistema debe proveer al rol Administrador un panel para crear, modificar, publicar y cerrar encuestas. 
	Los Estudiantes deben poder ver y participar en las encuestas activas, y el sistema debe registrar sus votos.
- Caso de uso o escenario: Un administrador crea una encuesta y un estudiante vota.
	- Paso 1:
		El administrador accede al panel, usa el formulario para crear una encuesta.
	- Paso 2:
		El Administrador establece la visibilidad de la encuesta a "Activa". Un Estudiante logueado accede a la pestaña de encuestas, selecciona una opción y registra su voto.

### 1.4 DIAGRAMAS FUNCIONALES

#### Diagrama de casos de uso:
<img width="621" height="798" alt="usecasesdiagram" src="https://github.com/user-attachments/assets/9cd48ab1-3153-42fe-8b94-ef1ea81849ad" />

#### Diagrama de flujo de procesos:

<img width="807" height="1906" alt="processflowdiagram" src="https://github.com/user-attachments/assets/28a04b44-c33f-464b-ae6e-2eefadc22a4c" />

#### Diagrama de secuencia:

![S_funcional](https://github.com/user-attachments/assets/dd6e26d5-a78b-4d98-a53e-76dba45861d8)

### 1.5 REQUISITOS NO FUNCIONALES

#### Rendimiento
	- Tiempo de respuesta rapido con multiples usuarios
	- Implementación de caché para contenido frecuentemente accedido

#### Seguridad
	- Protección contra vulnerabilidades comunes
	- Asignación y verificación de roleselor
#### Usabilidad
	- Interfaz intuitiva para los usuarios
	- Panel administrativo flexible
#### Disponibilidad
	- Actualización de contenido al instante
	- Integración de modo oscuro opcional

### 1.6 INTERFACES DEL SISTEMA

#### Interfaces con otros sistemas:

Las interfaces con otros sistemas que se utilizaran son:

	MongoDB (Servicio de base de datos)

El proposito del uso de mongo es el almacenamiento de colecciones tales como:

- Estudiante
- Administrador
- Encuestas

Solamente se utilizaran estas colecciones ya que el sistema solo se va a basar en las encuestas.

	Redis (Servicio de caché)

El proposito del uso de Redis es como una caché de consultas frecuentes, para no tener largos tiempos de espera al momento de cargar los datos de una encuesta.

	API JWT(JSON Web Token)
El proposito del uso de esta api es para manejar la información de los estudiantes, administrados, de esta forma teniendo una comunicación entre la página web y la base de datos, además de tener el sistema de tokens para que los usuarios "Estudiantes" solo puedan responder encuestas y no puedan crearlas (o sea que no puedan hacer lo mismo que los "Administradores"). Esta información se manejara de la siguiente manera:

Estudiantes:

- Nombre
- Contraseña
- Correo

Administrador:

- Nombre
- Contraseña
- Correo

#### Interfaces de usuario:

##### Registro:
<img width="1459" height="860" alt="registro" src="https://github.com/user-attachments/assets/13a97274-8832-4997-b80d-70599b87feca" />

##### Login:
<img width="1457" height="854" alt="inicioSesion" src="https://github.com/user-attachments/assets/ebe3cfca-1b79-4ba0-aa53-591ec6209e07" />

##### Página principal:
<img width="1459" height="796" alt="pag_principal" src="https://github.com/user-attachments/assets/bf859162-26e3-484b-a51d-d2d78234a2ba" />

##### Encuesta Seleccionada:
<img width="1438" height="802" alt="encuesta_seleccionada" src="https://github.com/user-attachments/assets/46589dff-7337-45ad-ab42-e1f681743fe3" />

##### Estadísticas:
<img width="1452" height="774" alt="estadisticas" src="https://github.com/user-attachments/assets/cb5044e6-8b91-4bba-9fe0-1b6db699ec27" />

##### Edición de perfil:

<img width="1437" height="802" alt="edicion_perfil" src="https://github.com/user-attachments/assets/4bb6d4d9-dba5-4186-8dc1-8b1b6403a8bf" />


### 1.7 RESTRICCIONES Y SUPUESTOS

### Restricciones técnicas o de negocio

Las restricciones técnicas y de negocio son:

#####  Restricciones técnicas:

- Tecnología fija: Se utilizara obligatoriamente MongoDB y Node.js
- Rendimiento: El sistema debé manejar 150 usuarios concurrentes sin fallar.
- Seguridad: El sistema protejerá las contraseñas utilizando bcryptjs.
- Hardware: El servidor se ejecutara en un entorno Linux.
- Intregración: La API utilizará un token al iniciar sesión (Estudiante o Administrador).

##### Restricciones de negocio:

- Tiempo: El sistema estará operativo en 5 semanas.
- Presupuesto: Se contará solamente con el presupuesto que la universidad (directiva de la carrera) proporcionó.
- Licenciameniento: Se utilizará solamente software de código abierto.

#### Suposiciones realizadas

Las suposiciones que realizamos son:

- Disponibilidad: Se asume que el servicio Redis esta disponible la gran parte del tiempo.
- Entorno: Se asume que la página se ejecutará en navegadores modernos (Microsoft Edge, Firefox, Chrome).

### 1.8 VALIDACIÓN Y CRITERIOS DE ACEPTACIÓN

#### Cómo se validaran las funcionalidades

##### Pruebas Unitarias:

- Se verificara cada componente para saber que todos estan funcionando correctamente, como por ejemplo el insertar un usuario en la base de datos, o el inicio de sesión y la correcta utilización del token.

#### Criterios para considerar la funcionalidad como completa

##### Login:

- El sistema debe autenticar al estudiante (o al administrador) con credenciales validas.

- El sistema no debe permitir el acceso de un estudiante (o administrador) con credenciales inválidas, ademas de mostrar un mensaje como "Las credenciales estan incorrectas, ingrese correctamente los datos y vuelva a iniciar sesión"

- El sistema debe de devolver un token JWT con el rol Estudiante (o uno para Administrador en el caso del ya mencionado).

##### Creación de encuesta:

- Un administrador debe de ingresar el título, descripción y al menos una pregunta a la encuesta.

- El sistema debe guardar la encuesta en la base de datos.

##### Uso de Redis:

- Las consultas siguientes a la primera deben de tener un tiempo de respuesta menor a 150 ms.


## 2. Diseño Técnico


### 2.1 Introducción

#### Propósito
Este documento describe el diseño técnico del sistema de encuestas orientado a estudiantes y administradores. Su objetivo es detallar la arquitectura, componentes, base de datos, interfaz de usuario y consideraciones técnicas para su implementación y mantenimiento.

#### Alcance
El sistema permite a los administradores crear y publicar encuestas, mientras que los estudiantes pueden responderlas. Incluye funcionalidades de autenticación, visualización de resultados y gestión de usuarios.

#### Referencias:
- Diagramas UML y ERD del sistema

- Arquitectura basada en microservicios

#### Tecnologías: Node.js, MongoDB, Redis, Docker, etc.


### 2.2 Arquitectura del sistema

#### Diagrama de arquitectura general:
<img width="741" height="833" alt="Diagrama_arquitectura_general drawio" src="https://github.com/user-attachments/assets/4ad310d8-3a37-4e70-8482-3fb0fce79f3f" />


#### Descripción de componentes y módulos

- Frontend Web: Interfaz gráfica para login, dashboard, encuestas, perfil y resultados

- API Gateway: Valida token y enruta solicitudes hacia los microservicios

- Microservicio de encuestas (Encuestas MS): CRUD de encuestas, validacion de votos, publicacion de eventos

- Microservicio de Usuarios (Usuarios MS): Registro, autenticacion, perfiles y roles (estudiante/administrador)

- Microservicio de Estadísticas (StatsMS): Procesa eventos de votos y genera métricas

- Cache(Redis): Almacena encuestas activas y resultados parciales

- Message Broker (Queue): Maneja eventos como VOTO_REGISTRADO

- MongoDB: Base de datos principal para usuarios, encuestas, votos y metricas


#### Tecnologia y plataformas utilizadas
- Frontend Web
- Backend: Node.js con Express
- Base de datos: MongoDB
- Cache: Redis
- Mensajes
- Infraestructura: Docker


### 2.3 Diseño de base de datos

#### Modelo entidad-relación o UML:
<img width="1019" height="1448" alt="er" src="https://github.com/user-attachments/assets/705e65f8-2b54-47ca-80f2-b062620bb148" />


##### Este modelo representa las entidades principal:
- Estudiante
- Administrador
- Encuesta

##### Con relaciones:
- Estudiante responde encuesta
- Administrador administra encuesta

##### Esquema de tablas y relaciones
- Estudiante: _id, orderDate, status
- Administrador: _id, name, email
- Encuesta: _id, estudiante_id, titulo, descripcion, fecha, opciones_voto, voto_usuario

##### Reglas de integridad y normalización
- Claves primarias y foráneas correctamente definidas
- Eliminacion de redunancias
- Cumplimiento de la tercera forma normal


### 2.4 Diseño de componentes

#### Descripción detallada de cada módulo/componente

- Encuesta: creacion, edición, publicacion, votación
- Estudiante: autenticacion,visualizacion, respuesta
- Administrador: gestion de encuestas


#### Diagramas de clases:
<img width="950" height="1880" alt="clases" src="https://github.com/user-attachments/assets/1e3262ce-c8ae-4cda-a342-bdc920d8b294" />


##### Representa las clases:
- Encuesta
- Estudiante
- Administrador
Con sus atributos y métodos correspondientes.

#### Diagramas de secuencia tecnico:
<img width="1476" height="1881" alt="Diagrama_secuencia_tecnica_alt drawio" src="https://github.com/user-attachments/assets/5e1efbb9-da25-48a9-91a5-f5a0a8439442" />


##### Flujo de votación:

- Validacion de token
- Verificacion de voto previo
- Registro del voto
- Publicacion en la cola de mensajes

##### Interfaces internas y externas

- REST API entre microservicios
- Interfaces web para usuarios
- Comunicación asincrónica via cola de mensajes


### 2.5 Diseño de la interfaz de usuario:

<img width="1018" height="743" alt="Diagrama_de_navegacion_UI_blanco" src="https://github.com/user-attachments/assets/c524d6fe-422b-483b-af95-8f5c1cf1fdd3" />


##### Descripción de navegación y elementos UI:
- Inicio de sesión
- Dash board con menú lateral
- Perfil "editable"
- Pantalla de encuestas
- Resultados visuales

### 2.6 Consideraciones de seguridad
##### Autenticación y autorización:
- JWT para autenticación
- Roles diferenciados: estudiante y administrador

##### Encriptación y protección de datos:
- HTTPS para comunicacion segura
- Encriptacion de contraseñas con bcryptjs
- Validacion de entrada para prevenir inyecciones

### 2.7 Plan de pruebas técnicas

##### Tipos de pruebas
- Unitarias: Funciones individuelas
- Integracion: Interaccion entre servicios
- Sistemas: pruebas end-to-end

##### Herramientas y entornos de prueba
- Jest
- Insomnia

### 2.8 Requisitos de hardware y software

##### Entorno de ejecucion
- Este sistema esta diseñado para ejecutarse localmente en su primera etapa lo que implica no requerir nube ni servidores externos de momento.

- Sistema operativo Linux

- Requisitos de software
    Node.js
    MongoDB
    Redis
    Navegador moderno para acceder al frontend

##### Consideraciones adicionales
- No se requiere conexiones a internet para el funcionamiento basico
- El despliegue se realiza mediante scripts locales o Docker Compose


### 2.9 Mantenimiento y escalabilidad

Estrategias para mantenimiento
- Actualizaciones por microservicio

