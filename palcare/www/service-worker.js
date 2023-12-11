

var cacheName = 'offline-form';
var errCache = 'error-cache'
var urlsToCache = [

  '/manifest.webmanifest',
  '/assets/frappe/js/lib/jquery/jquery.min.js',
  '/assets/js/frappe-web.min.js',
  '/assets/js/bootstrap-4-web.min.js',
  '/assets/css/frappe-web-b4.css',
  '/assets/palcare/css/login_page.css',
  '/assets/palcare/js/custom_login.js',
  '/website_script.js',
  '/enroll',
  '/esas',
  '/epas',
  '/final-sum',
  '/visit_details',
  '/medical_details',
  '/summary',
  '/enroll.html',
  '/enroll.js',
  '/epas.html',
  '/epas.js',
  '/esas.html',
  '/esas.js',
  '/final-sum.html',
  '/final-sum.js',
  '/visit_details.html',
  '/visit_details.js',
  '/medical_details.html',
  '/medical_details.js',
  '/summary.html',
  '/summary.js',
  '/notes',
  '/notes.html',
  '/notes.js',
  '/api/method/palcare.patient_list.Patient',
  '/api/method/palcare.patient_list.Doctor',
  '/api/method/palcare.patient_list.Nurse',
  '/api/method/palcare.patient_list.Counselor',
  '/api/method/palcare.patient_list.Comorbidiities',
  '/api/method/palcare.patient_list.Allergens'
];

self.addEventListener('install', e => {
  console.log('service worker installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('service worker caching files')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  console.log('service worker activated')
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName) {
            console.log('cleared old cache')

          }
        })
      )
    })
  )
})

// Stale while revalidate method

self.addEventListener('fetch', (event) => {

  if (event.request.url.indexOf('/login') !== -1) {
    return false;
  }

  if (event.request.url.indexOf('/api/method/frappe.client.get_js?') !== -1) {
    return false;
  }
  if (event.request.url.indexOf('/api/method/frappe.desk.reportview.get_list?') !== -1) {
    return false
  }

  if (event.request.url.indexOf('/socket.io/') !== -1) {
    return false
  }

  if (event.request.url.indexOf('/app') !== -1) {
    return false;
  }
  if (event.request.url.indexOf('/app/') !== -1) {
    return false;
  }
  if (event.request.url.indexOf('/assets/frappe/images/') !== -1) {
    return false;
  }
  if (event.request.url.indexOf('/assets/frappe/css/fonts/inter/') !== -1) {
    return false;
  }

  if (event.request.url.indexOf('/files/') !== -1) {
    return false;
  }


  if (event.request.method == 'POST') {
    return;
  }


  if (event.request.headers.has('range')) {
    return;
  }
  event.respondWith(caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((cachedResponse) => {
      const fetchedResponse = fetch(event.request).then((networkResponse) => {
        cache.put(event.request, networkResponse.clone());

        return networkResponse;
      });

      return cachedResponse || fetchedResponse;
    });
  }));

});

if (navigator.onLine) {
  var openRequest = indexedDB.open('PalcareForm', 4)
  openRequest.onerror = function (event) {

    console.log("Everyhour isn't allowed to use IndexedDB?!" + event.target.errorCode)
  },

    openRequest.onupgradeneeded = function (event) {

      var db = event.target.result
      if (!db.objectStoreNames.contains('offlineForm')) {

        db.createObjectStore('offlineForm', { keyPath: "key", autoIncrement: true })
      }

    }
  openRequest.onsuccess = (e) => {
    var dataOnline = e.target.result
    //opening object store
    const transactionOnline = dataOnline.transaction(['offlineForm'], 'readwrite')
    var store = transactionOnline.objectStore("offlineForm")
    var requestOnline = store.getAll()
    requestOnline.onsuccess = (res) => {
      let formData = requestOnline.result
      console.log(formData, "online formdata")
      enrollCall(formData, openRequest).then(
        () => {
          return true
        }
      )
    }
  }
}


var token = ''
// var auth = 'token 5b10dd2dfec8261:f833196a1b08c91' //local
var auth = 'token b1c52990f33d6df:93aca62b95177ba' //cloud
// var auth ='token 1b0a5ef8d7b0f12:036a05a74fc63db' //ip

async function openDB(form_data) {

  console.log("DATA", form_data)
  const openRequest = self.indexedDB.open('PalcareForm', 4)
  openRequest.onerror = function (event) {

    console.log("Everyhour isn't allowed to use IndexedDB?!" + event.target.errorCode)
  },

    openRequest.onupgradeneeded = function (event) {

      var db = event.target.result
      if (!db.objectStoreNames.contains('offlineForm')) {

        db.createObjectStore('offlineForm', { keyPath: "key", autoIncrement: true })
      }

    }

  openRequest.onsuccess = function (event) {

    var db = event.target.result
    const transaction = db.transaction(['offlineForm'], 'readwrite')
    var object = transaction.objectStore("offlineForm")
    const objectStoreRequest = object.add(form_data)
    transaction.oncomplete = function (event) {
      console.log('Transaction was completed')
    }
  }


}


enrollCall = (formData, openRequest) => new Promise((resolve1, reject1) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append("Cookie", "sid=Guest; system_user=no; full_name=Guest; user_id=Guest; user_image=");

  var raw = ''

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch("/api/method/palcare.offline_api.token", requestOptions)
    .then(response => response.text())
    .then(result => {
      token = JSON.parse(result).message

      const myPromise = new Promise(function (resolve, reject) {
        ajaxCall(formData, token, resolve, reject)

      })
      myPromise.then(
        () => {
          clearData(openRequest)
          resolve1("done")
        }
      )
        .catch(error => {
          reject1("error")
        })

    })
})


async function ajaxCall(value, token, resolve, reject) {

  console.log('AJAX function value', value)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", auth);
  myHeaders.append("X-Frappe-CSRF-Token", token)
  myHeaders.append("Content-Type", "text/plain");
 
  var raw = value;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  fetch("/api/method/palcare.offline_api.enrolment", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('function a calling', result);
      return resolve(result)
    })
    .catch(error => {
      console.log('error', error)
      return reject(error)
    });
}

function clearData(openRequest) {

  var db = openRequest.result
  var transaction = db.transaction(['offlineForm'], 'readwrite')
  var objectStore = transaction.objectStore('offlineForm')

  var deleteObjectStoreRequest = objectStore.clear()
}

// const broadcast = new BroadcastChannel('count-channel');
self.addEventListener('message', (event) => {

  console.log("broadcast..", event.data.data)
  if (event.data && event.data.type === 'ENROLL') {
    // broadcast.postMessage({ payload: ++count });
    form_data = event.data
    console.log(form_data, "enroll")
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'EPAS') {

    form_data = event.data
    console.log(form_data, "epas")
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'ESAS') {
    form_data = event.data
    console.log(form_data, "esasss")
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'VISIT') {
    form_data = event.data
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'FINAL') {
    form_data = event.data
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'MEDICAL') {

    form_data = event.data
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'SUMMARY') {

    form_data = event.data
    openDB(form_data)
  }

  else if (event.data && event.data.type === 'NOTES') {

    form_data = event.data
    openDB(form_data)
  }

});
