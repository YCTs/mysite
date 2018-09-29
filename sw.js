/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","00ab5e890d1919bab3f2e5251def4c1b"],["/Pose-Estimation/index.html","56fb62749c4379404fc688caab4aaebe"],["/QG/index.html","f1c6333c732513f33aeeb925232f7ee1"],["/SeqGAN/index.html","b0005fb8c8163032677b6cc7721d1a0d"],["/WGAN/index.html","694cebd137e83a9bc39317e2b243ef50"],["/about/index.html","937a6d71b7a1dda4ce93f09d2ce83ecd"],["/android-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/android-icon-192x192.png","3af6ab63b5cbef7fbb1b7190e93a5871"],["/android-icon-36x36.png","a7fd9f76e5766cfbd3b37c0a358548c3"],["/android-icon-48x48.png","72d947595457ec02e54ae7439f5dd294"],["/android-icon-72x72.png","49508e7b27134b1b860651dfb8c35e4d"],["/android-icon-96x96.png","8a8c14e1e4d905741583f390cdcd2243"],["/apple-icon-114x114.png","331efef7bb1fc178399979062fdbc9e9"],["/apple-icon-120x120.png","7b7fc0b6edc6edf13dfd1a93d8e294e2"],["/apple-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/apple-icon-152x152.png","c99bbbc453345c3c7a268b59d5bd7d6b"],["/apple-icon-57x57.png","c22fe220bab4b201d4ad6ecd116a1500"],["/apple-icon-60x60.png","fa553f057817a71499b4941f35a894a3"],["/apple-icon-72x72.png","49508e7b27134b1b860651dfb8c35e4d"],["/apple-icon-76x76.png","332123b5230da21aa9c3c50ee3e53220"],["/apple-icon-precomposed.png","15dbf416702a74e41fd9693cc185fba7"],["/apple-icon.png","15dbf416702a74e41fd9693cc185fba7"],["/apple-touch-icon.png","86293c966c9f1404fde6a0f9c55f846c"],["/assets/css/main.css","ece10e1ac7d9e87242a8df741a3016dd"],["/assets/img/favicon.png","fbe148cc1269f7b206cecdeaa0bdf912"],["/assets/img/favicon_s.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/assets/img/icons/android-icon-192x192.png","3af6ab63b5cbef7fbb1b7190e93a5871"],["/assets/img/icons/android-icon-36x36.png","a7fd9f76e5766cfbd3b37c0a358548c3"],["/assets/img/icons/android-icon-48x48.png","72d947595457ec02e54ae7439f5dd294"],["/assets/img/icons/android-icon-72x72.png","49508e7b27134b1b860651dfb8c35e4d"],["/assets/img/icons/android-icon-96x96.png","8a8c14e1e4d905741583f390cdcd2243"],["/assets/img/icons/apple-icon-114x114.png","331efef7bb1fc178399979062fdbc9e9"],["/assets/img/icons/apple-icon-120x120.png","7b7fc0b6edc6edf13dfd1a93d8e294e2"],["/assets/img/icons/apple-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/assets/img/icons/apple-icon-152x152.png","c99bbbc453345c3c7a268b59d5bd7d6b"],["/assets/img/icons/apple-icon-57x57.png","c22fe220bab4b201d4ad6ecd116a1500"],["/assets/img/icons/apple-icon-60x60.png","fa553f057817a71499b4941f35a894a3"],["/assets/img/icons/apple-icon-72x72.png","49508e7b27134b1b860651dfb8c35e4d"],["/assets/img/icons/apple-icon-76x76.png","332123b5230da21aa9c3c50ee3e53220"],["/assets/img/icons/apple-icon-precomposed.png","15dbf416702a74e41fd9693cc185fba7"],["/assets/img/icons/apple-icon.png","15dbf416702a74e41fd9693cc185fba7"],["/assets/img/icons/apple-touch-icon.png","86293c966c9f1404fde6a0f9c55f846c"],["/assets/img/icons/favicon-16x16.png","2f1173ba8f946c5a1b7fb087bbdabb66"],["/assets/img/icons/favicon-32x32.png","6ae9ad0cd718d5a6566d7072899add35"],["/assets/img/icons/favicon-96x96.png","8a8c14e1e4d905741583f390cdcd2243"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/icons8-facebook-filled.svg","e2174cccddb9878222b307e137e3d6dc"],["/assets/img/icons/ms-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/assets/img/icons/ms-icon-150x150.png","11e42dd154edaa792a58f1df371f86e5"],["/assets/img/icons/ms-icon-310x310.png","ab0c25f05e51713d0c67b6debde3c7aa"],["/assets/img/icons/ms-icon-70x70.png","588cfc0714e6d0a86b5686e140e01661"],["/assets/img/icons/mstile-150x150.png","11e42dd154edaa792a58f1df371f86e5"],["/assets/img/icons/safari-pinned-tab.svg","c6b219554dfc12a265c5e5de993792d1"],["/assets/img/posts/conv.jpg","218c1196e60e35c3cf7f25fbd149a5c2"],["/assets/img/posts/conv_lg.jpg","fea2b9ad974b24f843ad7b665fbbf16f"],["/assets/img/posts/conv_md.jpg","b39618e8b6e6dda09603a1f2f5cd3a69"],["/assets/img/posts/conv_placehold.jpg","d6c5659ae3b7cd61b27d9def9fe13255"],["/assets/img/posts/conv_sm.jpg","b67a5b8f69471f8f8d94a2d512926432"],["/assets/img/posts/conv_thumb.jpg","45beca6d05319425ec4770b83f398741"],["/assets/img/posts/conv_thumb@2x.jpg","cb9984f740ca018b0735d7e15c4e34bf"],["/assets/img/posts/conv_xs.jpg","e332093eb0cfb996c8460a0b9fc794de"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/gnmt.jpg","5cde0492422f45726895d710198057f3"],["/assets/img/posts/gnmt_lg.jpg","3d92308e9844d2a9c2389425b2fd1f4d"],["/assets/img/posts/gnmt_md.jpg","56ce1daadb85fe0aac27c2ee980709bc"],["/assets/img/posts/gnmt_placehold.jpg","a93c14a3589f0e900e626b39b5380d53"],["/assets/img/posts/gnmt_sm.jpg","39d36992e0ebab4e1825d839dffc0f01"],["/assets/img/posts/gnmt_thumb.jpg","a9f7e84c4e6c811b1dbd1dd426daea40"],["/assets/img/posts/gnmt_thumb@2x.jpg","d4d2a92b2547f19e53e3880cdec9787e"],["/assets/img/posts/gnmt_xs.jpg","a025a65dd7d77766f96d7028a895c562"],["/assets/img/posts/input_pad.png","d8b518f52934ae9e1e74b423945d2f2e"],["/assets/img/posts/output_pad.png","b2eb8c18a30be44a86d9e9822b42fd8c"],["/assets/img/posts/residualconnection.png","88a1c64364840d678332602c29a586ef"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","caea2418775878cbc47f0a68e1f53ac4"],["/contact/index.html","94f6d8073c82d4ebaa7e5457e37286f4"],["/convSeq2seq/index.html","752b6cf39c041e7fe7f7950a29d0cd4e"],["/course_gan/index.html","43546a8536537a7f43d12fdb5ebbdf29"],["/cycleGAN/index.html","4e9ec51c9cdbc024b266f9753bd4ad36"],["/favicon-16x16.png","2f1173ba8f946c5a1b7fb087bbdabb66"],["/favicon-32x32.png","6ae9ad0cd718d5a6566d7072899add35"],["/favicon-96x96.png","8a8c14e1e4d905741583f390cdcd2243"],["/gnmt/index.html","5ab71b82ee32770a5197530e17bdcc55"],["/index.html","abc2ad51b399d6f44012b13572e7ed82"],["/maskGAN/index.html","2c10425eb4cb80e1064bc34649e4034f"],["/ms-icon-144x144.png","f71d72ae98dc2caf8172afbb4e1d415d"],["/ms-icon-150x150.png","11e42dd154edaa792a58f1df371f86e5"],["/ms-icon-310x310.png","ab0c25f05e51713d0c67b6debde3c7aa"],["/ms-icon-70x70.png","588cfc0714e6d0a86b5686e140e01661"],["/mstile-150x150.png","11e42dd154edaa792a58f1df371f86e5"],["/safari-pinned-tab.svg","c6b219554dfc12a265c5e5de993792d1"],["/sw.js","95f34dbb00157510a07cd83a6f02f827"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







