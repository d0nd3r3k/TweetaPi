# TweetaPi

Tweet images from a RaspberryPi (model-B) from a web mobile application (iOS/Android). The application core is built with Node.js Express Framework and socket.io. 

# UI-Preview
![Tweetapi UI Preview](https://raw2.github.com/DonaldDerek/TweetaPi/master/public/images/preview.png)@40

### Installation
```
	npm install tweetapi
```

### Configuration
Make sure to create a Twitter App by visiting [dev.twitter.com](https://dev.twitter.com/).
After generating your access token, make sure to edit the config.js file with your credentials
```
  consumer_key: 'APP_KEY',
  consumer_secret: 'APP_CONSUMER_SECRET',
  token: 'APP_ACCESS_TOKEN',
  token_secret: 'APP_ACCESS_TOKEN_SECRET'
```

###Contributors
+ [Kifah Daher](https://github.com/KifahDaher)
+ [Donald Derek](https://github.com/DonaldDerek)

### License

(The MIT License)

Copyright (c) 2014 Donald Derek Haddad, Kifah Daher. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
