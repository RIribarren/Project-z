# Project-z

Realizar una API que sirva 

Features BE:

- Registro.
- Login.
- Alamcenar historial de operaciones (votos, cards, participantes).
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

Features FE:
- Carrera de patos.
- Cambios en tiempo real (modificación de votos, etc).
- Identificación visual de la categoria del usuario (Dev, QA, etc).
- Conteo de votos detallado (cantidad de votos por valoración).

- A futuro integrar features para facilitar las reuniones de acuerdos de desarrollo.

Realizar una API que nos sirva para gestionar pronósticos deportivos de un evento deportivo y  ver las estadísticas reales, y mostrar una tabla con la puntación obtenida por los aciertos de los usuarios. 


- IDEA DEPRECADA!!!!

https://github.com/estiens/world_cup_json

https://allsportsapi.com/soccer-football-api#plans

- Recibir los pronósticos del usuario
- Poder subir una imagen del perfil
- Permitir la descarga de un pdf con todos los pronósticos realizados por el usuario
- Lógica para comparar dichos pronósticos con el resultado real
- Lógica para calcular puntuación en base a los aciertos
- Soportar registro. Debe funcionar con JWT o con una base de datos como redis
- Persistir toda la data relacionada en postgres (SQL) y data no relacionada en una base de datos no relacional (mongoDB)
- Tener un chat para poder usar websockets
- Sería bueno dividirla en microservicios (ej: users, uno que se comunique con api externa, etc)
- Cada microservicio debe estar dockerizado
- Recolectar cierta data utilizando la tecnica de web scraping


- TODO a largo plazo:
    - Implementar algún servicio menor con GraphQL
    - Mandar cierta data para Analitycs con beacon api
