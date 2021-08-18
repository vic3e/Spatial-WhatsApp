/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config = {

  apiKey: "AIzaSyBokF0e9DxsFN0nKBxIxPZ3wobKf_QkFgE",

  authDomain: "vastverse-db828.firebaseapp.com",

  databaseURL: "https://vastverse-db828-default-rtdb.firebaseio.com",

  projectId: "vastverse-db828",

  storageBucket: "vastverse-db828.appspot.com",

  messagingSenderId: "218012039485",

  appId: "1:218012039485:web:b8795841ba5bcf6d36ad54",

  measurementId: "G-LEWRHN3K40"

};

firebase.initializeApp(config);
console.log('firebase init')


// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID =
    'YOUR_OAUTH_CLIENT_ID';
