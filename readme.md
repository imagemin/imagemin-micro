# imagemin-micro [![Build Status](https://travis-ci.org/imagemin/imagemin-micro.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-micro)

> Microservice for Imagemin


## Install

```
$ npm install --global imagemin-micro
```


## Usage

```
$ imagemin-micro
```

```
$ curl -X POST http://localhost:3000?url=http://foo.bar/unicorn.png > minified-unicorn.png
$ cat unicorn.png | curl -X POST --data-binary @- http://localhost:3000 > minified-unicorn.png
```


## License

MIT © [imagemin](https://github.com/imagemin)
