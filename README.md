# Project-z
# Introducción - Capacitación NodeJS
Este proyecto es parte de una capacitación que se lleva a cabo dentro de Nubi. La misma estará compuesta por el dictado de varias charlas explicativas, y el desarrollo de un **sistema para facilitar el proceso de refinamiento** de equipos que trabajen con Scrum como metodología ágil.

La siguiente capacitación tiene como objetivo adquirir habilidad de código en **NodeJS** para poder desarrollar soluciones o implementaciones con módulos que correrán en un servidor (backend), así como mantenimiento de los mismos.

### Charlas dictadas
- Setup inicial de un proyecto en Node
- Buffers y Streams
- Scripts con Node
- MongoDB
- PostgreSQL con Node + pgAdmin
- CORS
- SQL

---
En este proyecto vamos a poner en práctica las tecnologías y conceptos aprendidos, desarrollando las siguientes features:


## Features de la API:

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
- Implementar algún servicio menor haciendo uso de GraphQL

## Features front-end:
- Cambios en tiempo real (modificación de votos, etc).
- Identificación visual de la categoria del usuario (Dev, QA, etc).
- Conteo de votos detallado (cantidad de votos por valoración).
- Carrera de patos.
- A futuro integrar features para facilitar las reuniones de acuerdos de desarrollo.
- Mandar cierta data para Analitycs con beacon api
