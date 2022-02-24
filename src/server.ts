import express from 'express';

const app = express();

app.get("/test", (request, response) => {
  return response.send("Olá NLW")
})

app.post("/test-post", (request, response) => {
  return response.send("Olá NLW método POST")
})

app.listen(8080, () => {
  return console.log(`Server running in port: ${8080} - Time: ${new Date}`)
})