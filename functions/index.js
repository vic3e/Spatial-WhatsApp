const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
const { object } = require("firebase-functions/lib/providers/storage");
admin.initializeApp();
const db = admin.firestore();
const cors = require('cors')({origin: true});


exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
   
  })
});

exports.updateMessagingToken = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    db.collection('users').doc(request.body.data.uid).update({
      messagingToken:request.body.data.messagingToken
    });
    response.send({result:'OK'});
   
  })
});

exports.sendMessage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    //todo
    
    response.send({result:'OK'});
   
  })
});

exports.getUserList = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const idToken = request.body.data.idToken;
    console.log(idToken)
    if( idToken !== undefined){
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
              if(doc.id !== uid){
                data.push(Object.assign(doc.data(),{uid:doc.id}))
              }
          });

        response.send({data});

        });
      })
      .catch((error) => {
        // Handle error
        console.log('idToken verify failed');
        console.log(error);
        response.send({data:'access deny'});
      });
    }
    else {
      console.log('no idToken');
      return response.send({data:'access deny'});
      }
    })
  

});


exports.newUserDetected = functions.auth.user().onCreate((user) => {
    functions.logger.info("Hello" + user.displayName, {structuredData: true});
    const docRef = db.collection('users').doc(user.uid);

    return docRef.set({
      displayName:user.displayName
    });
    
});

exports.oldUserGone = functions.auth.user().onDelete((user) => {
    functions.logger.info("Bye" + user.displayName, {structuredData: true});
});