# Sistema de encuestas para centro de estudiantes
---

## Requerimientos:

***Descripción del cliente***

- Nombre del cliente: Carlos Sepúlveda, Centro de Estudiantes de Derecho

***Contexto***

En el Centro de Estudiantes de Derecho tenemos una gran dificultad para realizar encuestas de manera ordenada y accesible. Actualmente usamos herramientas externas como Google Forms u otros servicios gratuitos, lo que nos genera varios problemas: las encuestas quedan dispersas, es difícil administrarlas desde un solo lugar, y no tenemos un control total sobre los datos ni sobre la disponibilidad del servicio. Además, muchas veces resulta complicado para los estudiantes acceder a encuestas antiguas, ver resultados o participar de manera clara.

Nos gustaria tener una página web en la que se puedan responder las encuestas y se puedan acceder a estas de forma clara y sencilla, además de tener la herramienta para administrarlas facilmente sin la necesidad de tener a alguien experto, para que sea manejable por cualquier integrante de la directiva.

No sabemos nada de programación, así que necesitamos algo que nosotros podamos manejar fácil después, sin tener que estar pidiéndole ayuda a alguien todo el tiempo. Algo claro, simple, donde nosotros podamos crear, administrar encuestas y manejar los datos de estas.

---

***Problema principal***

-Falta de un sistema de encuestas para saber y manejar datos sobre las respuestas de los estudiantes y que no dependa a algun otro servicio lo que provoca:
- Dificultad de nuevos estudiantes para participar.
- Falta de control sobre las encuestas.
- Desconocimiento sobre el manejo de encuestas en otras plataformas.
- Falta de versatilidad al crear y manejar las encuestas (datos).
- Falta de una forma sencilla para acceder y contestar las encuestas.

---

***Tipo de usuarios y perfiles con roles***

-Administrador (Personas Capacitadas):
- Miembros directivos del centro de estudiantes
- Permisos: Gestión completa del sistema, moderación de contenido
 
-Estudiante (Registrado):
- Estudiantes de la facultad registrados
- Permisos: Ver información, votar encuestas

---

***Funciones indispensables por Perfil***

-Administrador:
- Gestionar usuarios y permisos
- Editar visibilidad de encuestas
- Crear y cerrar encuestas

-Estudiante:
- Registrarse en el sistema
- participar en encuestas

---

***Datos básicos a almacenar***

-Usuario
- ID
- Nombre Completo
- Correo Electronico institucional

-Administrador
- ID
- Nombre completo
- Correo electronico institucional

-Encuestas
- ID
- Titulo
- Descripcion
- Fecha creacion
- Opciones de voto
- Votos de usuarios
---

***Requisitos Funcionales***

-RF01 - Autenticación y Autorización

- El sistema debe permitir registro con validación de email institucional
- El sistema debe implementar login/logout seguro
- El sistema debe asignar y verificar roles de usuario
- El sistema debe permitir votar solo al logear con email institucional

-RF02 - Gestión de ideas

- El sistema debe permitir crear nuevas encuestas
- El sistema debe mostrar estados de las encuestas

***Requisitos no Funcionales***

-RNF01

- Interfaz intuitiva para usuarios
- Resoluciones flexibles para distintos dispositivos 
- Navegacion simple y clara

-RNF02

- Panel administrativo más flexible
- Actualizacion de contenido al instante

-RNF03

- Tiempo de respuesta rapido incluso con multiples usuarios
- Cache para contenido frecuentemente accedido
- Integracion de un modo oscuro

---

***MVP***

El MVP de la página web que el cliente solicito tendra:

- La página sera un sitio de encuestas en donde los estudiantes y profesores podrán votar para tomar decisiones entre todos.
- La estetica de la página sera muy parecida a como es la página oficial de la Universidad.
- Tendra un apartado o pestaña en donde se podra ver las encuestas publicadas.
- Trendra un apartado o pestaña en donde se podrán ver los participantes del centro de estudiantes.
- Como ya se mencionó, tendrá un aparado o pestaña en donde los Estudiantes podrán ver las encuestas cerradas, por completar o realizadas.

Las ideas que se podrían implementar a futuro son:

- Enviar mensajes de WhatsApp a los estudiantes avisando que hay nuevas encuestas por responder.
- Interfaz personalizable (Colores).
- Tener la capacidad de modificar el perfil (Foto de perfil).
  

