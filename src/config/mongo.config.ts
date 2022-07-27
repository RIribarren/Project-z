export default {
DB_USER:process.env.DB_USER,
DB_PASSWORD:process.env.DB_PASSWORD,
DB_NAME:process.env.DB_NAME,
DB_URI:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o5c7c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
PORT : 8080
}