# Project-z

Realizar una API que sirva

Features BE:

- Registro.
- Login.
- Almacenar historial de operaciones (votos, cards, participantes).
  - Almacenar en BD el resultado de la votación.
- Invitar usuarios por email.
- Configurar opciones de votación.
- CRUD cards.
- CRUD usuarios (fotos de perfil, nombre, categoría).
- CRUD sesiones de votos (incluyendo votación, fecha, participantes).
- Permitir la descarga de un PDF con el historial basado en un filtro.
- Chat realtime.
- Enviar un reporte por email al finalizar una sesión de votos.
- Traer la info de la card en votación desde Jira con web scraping.
- Recolectar data que ayude a encontrar cierta info basado en palabras claves utilizando la tecnica de web scraping.
- Generar reportes estadísiticos basados en los criterios requeridos llegado el momento.
- Cada cliente que entre en una sesión ya iniciada se actualice automaticamente el estado actual de la sesion (uso de redis con websockets).

Features FE:

- Carrera de patos.
- Cambios en tiempo real (modificación de votos, etc).
- Identificación visual de la categoria del usuario (Dev, QA, etc).
- Conteo de votos detallado (cantidad de votos por valoración).

- A futuro integrar features para facilitar las reuniones de acuerdos de desarrollo.

- TODO a largo plazo:
  - Implementar algún servicio menor con GraphQL
  - Mandar cierta data para Analitycs con beacon api

Charlas pendientes:

- Charla de CORS
- Charla de SQL
- Charla de autenticación
- Charla de websockets
- Charla de redis

Proximos pasos:

- Armar el script para inicializar el modelo (armar las tablas con los diferentes datos y cargar las tablas)
- Encriptar las contraseñas en la tabla de user
- Configurar y comenzar a utilizar Sequelize
