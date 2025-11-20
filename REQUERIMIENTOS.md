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
- Permisos: Gestión completa del sistema, moderación de contenido, asignación de roles

-Super Usuario (Directiva de centro):
- Miembros directivos del centro de estudiantes
- Permisos: Gestión y moderación de contenido.
  
-Estudiante (Registrado):
- Estudiantes de la facultad registrados
- Permisos: Ver información, proponer ideas, comentar propuestas
  
-Profesor (Docentes):
- Docentes de la facultad
- Permisos: Ver información, comentar en propuestas, dar feedback académico

-Invitado (Personas fuera de la Universidad):
- Cualquier persona que visite el sitio
- Permisos: Solo lectura de información pública

---

***Funciones indispensables por Perfil***

-Administrador:
- Gestionar usuarios y permisos
- Crear y moderar propuestas/ideas
- Asignar responsables de proyectos
- Actualizar contenido estático (quiénes somos, contactos)
- Editar visibilidad de la pagina

-Super Usuario:
- Gestiona publicaciones
- Publicar información oficial
- Crear y cerrar encuestas
- Crear y moderar propuestas/ideas

-Estudiante:
- Registrarse en el sistema
- Proponer nuevas ideas
- Ofrecerse como voluntario en proyectos
- Ver estado de las propuestas
- Comentar ideas existentes

-Profesor:
- Ver información pública
- Comentar en propuestas estudiantiles
- Recibir notificaciones de actividades relevantes

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
- El sistema debe permitir comentar solo al logear con email institucional

-RF02 - Gestión de ideas

- El sistema debe permitir crear nuevas ideas/propuestas
- El sistema debe permitir comentar encuestas
- El sistema debe mostrar estados de las encuestas
- El sistema debe mostrar sugerencias de ideas para publicaciones

***Requisitos no Funcionales***

-RNF01

- Interfaz intuitiva para usuarios
- Diseño flexible para distintas resoluciones
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

- La página sera un "blog" en donde los estudiantes y profesores podrán ponder sus ideas.
- La estetica de la página sera muy parecida a como es la página oficial de la Universidad.
- Tendra un apartado o pestaña en donde se podra ver la información reciente que se publico.
- Trendra un apartado o pestaña en donde se podrán ver los participantes del centro de estudiantes.
- Como ya se mencionó, tendrá un aparado o pestaña en donde los Estudiantes o Profesores podrán poner sus ideas al estilo de los "blogs".
- Pestaña con encuestas para que los estudiantes puedan tomar decisiones.

Las ideas que se podrían implementar a futuro son:

- Enviar mensajes de WhatsApp a los estudiantes avisando cambios, noticias, etc.
- Interfaz personalizable (Colores).
- Tener la capacidad de modificar el perfil (Foto de perfil).
  

