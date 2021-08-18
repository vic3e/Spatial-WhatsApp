const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
const { object } = require("firebase-functions/lib/providers/storage");
admin.initializeApp();
const db = admin.firestore();
const cors = require('cors')({ origin: true });

// this api is test only , not use in the web app
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");

  })
});

//once user1 enter chat-app page , firebase generate new messaging token for this device(browser)
//we should store this token and pass to another user who wants to send message to user1
exports.updateMessagingToken = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    db.collection('users').doc(request.body.data.uid).update({
      messagingToken: request.body.data.messagingToken
    });
    response.send({ result: 'OK' });

  })
});

//we should move sendMessage function to server side, because this task require firebase messaging server key
exports.sendMessage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    console.log(request.body.data);
    const message = {
      data: request.body.data.messageObj,
      tokens: [request.body.data.targetToken,],
    };
    
    
    admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
      });

    response.send({ result: 'OK' });

  })
});

//get all user public data in firestore except who calls this API
exports.getUserList = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const idToken = request.body.data.idToken;
    console.log(idToken)
    if (idToken !== undefined) {
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          db.collection('users').get().then((querySnapshot) => {
            data = []
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              if (doc.id !== uid) {
                data.push(Object.assign(doc.data(), { uid: doc.id }))
              }
            });

            response.send({ data });

          });
        })
        .catch((error) => {
          // Handle error
          console.log('idToken verify failed');
          console.log(error);
          response.send({ data: 'access deny' });
        });
    }
    else {
      console.log('no idToken');
      return response.send({ data: 'access deny' });
    }
  })


});

// once new user login on index page
// it automatically add new record in user document in firestore 
exports.newUserDetected = functions.auth.user().onCreate((user) => {
  functions.logger.info("Hello" + user.displayName, { structuredData: true });
  const docRef = db.collection('users').doc(user.uid);

  return docRef.set({
    displayName: user.displayName
  });

});

//test only
exports.oldUserGone = functions.auth.user().onDelete((user) => {
  functions.logger.info("Bye" + user.displayName, { structuredData: true });
});