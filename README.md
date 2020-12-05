# shiramine-backend

## クローンして最初に行うこと

以下のコマンドを実行  
```bash
cd shiramine-backend
npm install
```

shiramine-backend直下に`.env`ファイルを作成し以下を記述  
```text:.env
DB_USERNAME="<mysqlのログインのユーザネーム>"
DB_PASSWORD="<mysqlのログインのパスワード>"
DB_DATABASE="<mysqlのデータベース名>"
DB_HOST="<mysqlのホスト>"
DB_PORT="<mysqlのポート>"
DB_WEBSOCKET="<mysqlのWEBSOCKET(UNIXのみ)>"
JWT_SECRET="<jwtの秘密鍵>"
```

## API一覧

| 機能 | エンドポイント | 通信 | ログイン | 説明 |
----|----|----|----|----
| 動作確認 | / | GET | 不要 | 接続テスト用 |
| ログイン | /login | POST | 不要 | email,passwordを送るとログイン情報を送る |
| ユーザ情報 | /user | GET | 不要 | 自分の情報を返す |
| ユーザ情報 | /user/:id | GET | 不要 | ユーザ一人の情報を返す |
| ユーザ一覧 | /users | GET | 不要 | 全ユーザの情報を返す |
| ユーザ作成 | /user/create | POST | 不要 | name,email,password,roleを送ると登録される |
| ユーザ削除 | /user/delete/:id | GET | 不要 | id(ユーザid)を送るとそのユーザが削除されます |
| ユーザ編集 | /user/edit/:id | POST | 不要 | id(ユーザid)で指定したユーザのユーザ情報を変更できます |
| 投稿一覧 | /posts | GET | 不要 | 投稿のリストを返す |
| 投稿ごとの閲覧 | /post/:id | GET | 不要 | ユーザ一人の情報を返す |
| 投稿の作成 | /post/create | POST | 不要 | name,user_id,type,img_id,location_idを送ると登録される |
| 投稿の削除 | /post/delete/:id | GET | 不要 | id(投稿のid)を送るとその投稿が削除されます |
| 投稿の編集 | /post/edit/:id | POST | 不要 | id(投稿id)で指定した投稿の情報を変更できます |
| 画像一覧 | /images | GET | 不要 | 画像のリストを返す |
| 画像ごとの閲覧 | /image/:id | GET | 不要 | 画像ごとの情報を返す |
| 画像の作成 | /image/create | POST | 不要 | nameを送ると登録される |
| 画像の削除 | /image/delete/:id | GET | 不要 | id(画像のid)を送るとその投稿が削除されます |
| 画像の編集 | /image/edit/:id | POST | 不要 | id(画像id)で指定した画像の情報を変更できます |
| 位置情報一覧 | /locations | GET | 不要 | 位置情報のリストを返す |
| 位置情報ごとの閲覧 | /location/:id | GET | 不要 | 位置情報ごとの情報を返す |
| 位置情報の作成 | /location/create | POST | 不要 | nameを送ると登録される |
| 位置情報の削除 | /location/delete/:id | GET | 不要 | id(位置情報のid)を送るとその位置情報が削除されます |
| 位置情報の編集 | /location/edit/:id | POST | 不要 | id(位置情報id)で指定した位置情報の情報を変更できます |

## ログインの流れ
1. 白峰のサイトにアクセス
2. bnb+でログインを押す
3. bnb+のログインフォームに飛ぶ
4. email,passwordでログイン
5. 白峰のサイトに戻る(その際OIDCTokenを発行)
6. そのOIDCTokenを用いて白峰のサイトにログイン
8. API側はOIDCTokenからsubを取得それをDBに保持
9. その後、白峰のサイトAPIがJWTを発行
10. JWTをvuexに格納

## データベース

### users
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| password | パスワード | varchar(255) | NO |
| email | メールアドレス | varchar(255) | NO |
| name | ユーザの名前 | varchar(255) | NO |
| role | 白峰BSにおける役割 | enum('traveller', 'admin', 'keyperson') | NO |
| bleUuid | BLEのUUID | varchar(255) | YES |
| bnbplusSubject | bnb+のoidcのsub | varchar(255) | YES |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### posts
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| name | 投稿されたものの名前 | text | YES |
| user_id | 投稿したユーザのID | int(11) | NO |
| type | 投稿の種類 | enum('animal', 'plant', 'disaster') | NO |
| img_id | 投稿された画像 | int(11) | NO |
| location_id | 投稿された場所 | int(11) | NO |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### images
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| name | 画像の名前 | text | YES |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### locations
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| latitude | 緯度 | float | YES |
| longitude | 経度 | float | YES |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |


## Sequelize

データベースがない場合に以下の手順で作成する。

### データベースの作成
```bash
node_modules/.bin/sequelize model:generate --name user --attributes name:string,role:enum,bleToken:string,bnbplusApiToken:string

node_modules/.bin/sequelize model:generate --name spot --attributes name:string,gatewayId:string,useFaceRecognition:boolean,longitude:float,latitude:float,description:text

node_modules/.bin/sequelize model:generate --name keyperson --attributes keypersonId:integer,talkUserId:integer
```
## マイグレーション
```bash
# 以下はテーブル作成の手順なので先にDBを作成する必要がある
node_modules/.bin/sequelize db:migrate
```

## DB削除
```bash
# 内容だけではなくDB自体も消えるので注意
node_modules/.bin/sequelize db:drop 
```
