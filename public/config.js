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

var config = {
  apiKey: "AIzaSyAazFKaMxplmV5HDF0J7ItcHOXcQT7f72w",
  authDomain: "vast-test-8dbd1.firebaseapp.com",
  databaseURL: "https://vast-test-8dbd1-default-rtdb.firebaseio.com",
  projectId: "vast-test-8dbd1",
  storageBucket: "vast-test-8dbd1.appspot.com",
  messagingSenderId: "1033631231445",
  appId: "1:1033631231445:web:cf54df0a7b7f9bf056615c",
  measurementId: "G-ZPRV5X07KW"


};
firebase.initializeApp(config);
console.log('firebase init')


// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID =
    'YOUR_OAUTH_CLIENT_ID';
