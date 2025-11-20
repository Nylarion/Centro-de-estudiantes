# Web para centro de estudiantes
---

## Requerimientos:

***Descripción del cliente***

- Nombre del cliente: Carlos Sepúlveda, Centro de Estudiantes de Derecho

***Contexto***

Yo estoy en el centro de estudiantes de Derecho, y uno de los temas que más nos cuesta es organizarnos bien con los estudiantes y también con las ideas o propuestas que van surgiendo.
Lo que pasa es que hoy por hoy todo lo hacemos por WhatsApp, mails, o formularios sueltos de Google. Entonces la info se pierde, nadie sabe bien qué cosas ya se propusieron, qué se está trabajando, o quién está a cargo de qué cosa. Por ejemplo, a veces alguien propone algo en una reunión o en el grupo de WhatsApp, y después no se sigue con la idea porque se pierde entre tantos mensajes o directamente se olvida. También hay estudiantes que quieren participar o ayudar, pero no saben cómo o ni a quién acercarse.

Nos gustaría tener una página web del centro donde se pueda centralizar todo: que la gente vea quiénes somos, qué estamos haciendo, que pueda proponer ideas, y que esas ideas no se pierdan. También si alguien quiere sumarse a algún proyecto, que vea en qué puede colaborar. Y que sea más ordenado, más transparente, y más fácil para todos. Que esté todo en un solo lugar.

No sabemos nada de programación, así que necesitamos algo que nosotros podamos manejar fácil después, sin tener que estar pidiéndole ayuda a alguien todo el tiempo. Algo claro, simple, donde nosotros podamos actualizar la información si es necesario.

---

***Problema principal***

-Falta de organización y centralización de la información, comunicación y gestión de ideas dentro del centro de estudiantes de las facultades de la universidad, lo que genera:
- Pérdida de información valiosa entre los múltiples canales (WhatsApp, E-mail o Formularios).
- Falta de seguimiento de propuestas e ideas.
- Desconocimiento sobre las personas que estan a cargo de los proyectos.
- Dificultad de nuevos estudiantes para participar.
- Falta de transparencia en las actividades del centro.
- Desconocimiento de los cargos que tienen los participantes del centro de estudiantes.

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
- El sistema debe permitir comentar ideas
- El sistema debe mostrar estados de las ideas (pendiente/aprobada/desaprobada)
- El sistema debe mostrar sugerencias de ideas para publicaciones

***Requisitos no Funcionales***

-RNF01

- Interfaz intuitiva para usuarios no tècnicos
- Diseño flexible para distintas resoluciones
- Navegacion simple y clara

-RNF02

- Panel administrativo fácil de usar sin conocimientos tècnicos
- Actualizacion de contenido sin necesidad de programacion

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
  

