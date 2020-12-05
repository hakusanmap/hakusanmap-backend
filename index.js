const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('./models/index')
const config = require('./config/jwtConfig')
const auth = require('./auth')

const index = require('./routes/index')
const login = require('./routes/login')
const users = require('./routes/users')
const user = require('./routes/user')
const userCreate = require('./routes/userCreate')
const userId = require('./routes/userId')
const userDeleteId = require('./routes/userDeleteId')
const userEditId = require('./routes/userEditId')
const posts = require('./routes/posts')
const postCreate = require('./routes/postCreate')
const postId = require('./routes/postId')
const postDeleteId = require('./routes/postDeleteId')
const postEditId = require('./routes/postEditId')
const images = require('./routes/images')
const imageCreate = require('./routes/imageCreate')
const imageId = require('./routes/imageId')
const imageDeleteId = require('./routes/imageDeleteId')
const imageEditId = require('./routes/imageEditId')
const locations = require('./routes/locations')
const locationCreate = require('./routes/locationCreate')
const locationId = require('./routes/locationId')
const locationDeleteId = require('./routes/locationDeleteId')
const locationEditId = require('./routes/locationEditId')

require('dotenv').config()

const port = 4000

// expressの設定
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORSを許可
app.use((req, res, next) => {
    // FIXME: セキュリティなんとかせねば
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

/** 接続検証用 */
app.get('/', index)

/** ログイン */
app.post('/login', login)

/** ユーザの一覧 */
app.get('/users', users)

/** idユーザの閲覧 */
app.get('/user/:id([0-9]+)', userId)

/** ユーザ本人の情報 */
app.get('/user', user)

/** ユーザの作成 */
app.post('/user/create', userCreate)

/** ユーザの削除 */
app.get('/user/delete/:id([0-9]+)', userDeleteId)

/** ユーザの編集 */
app.post('/user/edit/:id([0-9]+)', userEditId)

/** 投稿の一覧 */
app.get('/posts', posts)

/** 投稿ごとの閲覧 */
app.get('/post/:id([0-9]+)', postId)

/** 投稿の作成 */
app.post('/post/create', postCreate)

/** 投稿の削除 */
app.get('/post/delete/:id([0-9]+)', postDeleteId)

/** 投稿の編集 */
app.post('/post/edit/:id([0-9]+)', postEditId)

/** 画像の一覧 */
app.get('/images', images)

/** 画像ごとの閲覧 */
app.get('/image/:id([0-9]+)', imageId)

/** 画像の作成 */
app.post('/image/create', imageCreate)

/** 画像の削除 */
app.get('/image/delete/:id([0-9]+)', imageDeleteId)

/** 画像の編集 */
app.post('/image/edit/:id([0-9]+)', imageEditId)

/** 位置情報の一覧 */
app.get('/locations', locations)

/** 位置情報ごとの閲覧 */
app.get('/location/:id([0-9]+)', locationId)

/** 位置情報の作成 */
app.post('/location/create', locationCreate)

/** 位置情報の削除 */
app.get('/location/delete/:id([0-9]+)', locationDeleteId)

/** 位置情報の編集 */
app.post('/location/edit/:id([0-9]+)', locationEditId)


app.get('/test', auth, (req, res) => {
    return res.status(200).json({
      message: 'Hello!',
      authEmail: req.jwtPayload.email,
    })
})

app.listen( port, _ => console.log(`Listening on port ${port}`) )