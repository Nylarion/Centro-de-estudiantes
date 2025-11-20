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
![alt text](usecasesdiagram.png)

#### Diagrama de flujo de procesos:

![alt text](processflowdiagram.png)

#### Diagrama de secuencia:

![alt text](Diagrama_secuencia_tecnica_alt.drawio.png)

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

- Interfaces de usuario: WireFrame

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
