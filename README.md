# Project-z

Realizar una API que nos sirva para gestionar pronósticos deportivos de un evento deportivo y  ver las estadísticas reales, y mostrar una tabla con la puntación obtenida por los aciertos de los usuarios. 


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
