require('dotenv-extended').load();
const moment = require('moment');
const builder = require('botbuilder');
const restify = require('restify');
const server = restify.createServer();

// Setup bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);

// Setup LUIS
const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
const intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Setup Intents
intents.matches('Saludar', function (session, results) {
    session.send('¡Hola! ¿Qué café desea?');
});

intents.matches('Pedir', [function (session, args, next) {
    const coffees = ['Espresso', 'Espresso con leche', 'Capuccino', 'Decaf', 'Decaf con leche','Mocha'];
    const entityCoffee = builder.EntityRecognizer.findEntity(args.entities, 'Coffee');

    if (entityCoffee) {
        var match = builder.EntityRecognizer.findBestMatch(coffees, entityCoffee.entity);
    }

    if (!match) {
        builder.Prompts.choice(session, 'La selección de cafés Gourmet de hoy es, ¿Cual le gustaría probar?', coffees);
    } else {
        next({ response: match });
    }
}, function (session, results) {
    if (results.response) {
        const time = moment().add(2, 'm');

        session.dialogData.time = time.format('HH:mm');
        session.send("De acuerdo Señor, tendrá su %s humeando a las %s.", results.response.entity, session.dialogData.time);
    } else {
        session.send('De acuerdo Señor, si no le gustan, intentelo la próxima vez :)');
    }
}]);

intents.matches('Cancelar', function (session, results) {
    session.send('OK pues nada de café ¡Vuelve pronto!');
});

intents.matches('Comprobar', function (session, results) {
    session.send('Tendrá su café listo a las %s', session.dialogData.time);
});

intents.onDefault(builder.DialogAction.send('Lo siento, creo que no te entiendo, hable un poco más lento'));

bot.dialog('/', intents);

// Setup Restify Server
server.post('/api/messages', connector.listen());

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s Listening %s', server.name, server.url);
});