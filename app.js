// Import dependencies
const express = require('express');
let kafka = require('kafka-node');
const cors = require('cors');

// Init express
const app = express();

// Activate CORS
app.use(cors());

// Disable headers
app.disable('x-powered-by');

const bodyParser = require('body-parser');
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true,
}));

// ++++++++++ Config Producer Kafka +++++++++
let Producer = kafka.Producer;

// Set url to Consumer Kafka
// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const client = new kafka.KafkaClient({
    kafkaHost: 'kafka.name.domain.corp:6667',
});

let producer = new Producer(client, { requireAcks: 1 });

// Run producer
producer.on('ready', function () {
    console.log('Producer is ready');
});

// Catch errors
producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})

const argv = require('optimist').argv;

// Set topic of kafka
// var topic = argv.topic || 'test';
let topic = argv.topic || 'name-topic-default';

const p = argv.p || 0;
const a = argv.a || 1;

// ------------- Finish Config Producer Kafka -------------

/**
 * Service GET
 * Show message welcome
 * 
 * @returns void
 */
app.get('/', function (req, res) {
    res.json({ greeting: 'Kafka Producer' })
});


/**
 * Service Post
 * Get data and transform to string, and send information to producer
 * 
 * @returns void
 */
app.post('/logs', cors(), function (req, res) {
    const topicSelected = (req.body.additional[0].topic) ? req.body.additional[0].topic : topic;
    const sentMessage = JSON.stringify(formatDora(req.body));
    const payloads = [
        { topic: topicSelected, partition: p, messages: [sentMessage], attributes: a }
    ];
    producer.send(payloads, function (err, data) {
        res.json(data);
    });
});

/**
 * Format data post to kibana logs. Format style Dora
 * 
 * @param {any} data 
 * @returns string
 */
function formatDora(data) {
    return finalMessage = {
        level: data.additional[0].level,
        message: data.message,
        project: data.additional[0].project,
        browser: data.additional[0].browser,
        "language-browser": data.additional[0].language,
        "language-app": data.additional[0].languageApp,
        platform: data.additional[0].platform,
        appVersion: data.additional[0].appVersion,
        logs: JSON.stringify(data.additional[0].logs),
        timestamp: data.timestamp
    };
}

/**
 * Open port for listening
 * 
 * @returns void
 */
const server = app.listen(8080, function () {
    console.log('Kafka producer running at 5001')
});

module.exports = server;