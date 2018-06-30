# Service for connection with Kafka
This project, expose post service.
Format Request post.
Send data to consumer Kafka.

## Libraries
For Server [Express](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md): https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md
For [connect Kafka](https://www.npmjs.com/package/kafka-node): https://www.npmjs.com/package/kafka-node
For [CORS connection CORS](https://github.com/expressjs/cors): https://github.com/expressjs/cors

## Run application
You should install dependencies.
```sh
npm install
```

Run application
```sh
node app.js
```

## Details
If you want change url of Consumer Kafka, you should change kafkaHost.

```javascript
const client = new kafka.KafkaClient({
    kafkaHost: 'kafka.name.domain.corp:6667',
});
```

You can change default topic
```javascript
let topic = argv.topic || 'name-topic-default';
```

You can run test and you generate reports
```sh
npm run test:reporter
```