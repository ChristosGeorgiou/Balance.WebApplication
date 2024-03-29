Balnc (balance) is an free and open source business management suite for small companies and freelancers. The basic idea behind balnc is that if software and cloud providers can not be trusted the software should be open source and business data (and other) should be located in own storage. Everyone should securing his own local enviroment of computers and network as he also secure his doors and windows from thieves. With the rise of distributed systems, distributed apps with high security are the way to go.

## Features

- Offline-first application build with web technologies
- All features and modules are **running local** at the users machine with improved loading speed
- Sync data automatically and securely with remote databases that owned by you
- All data are stored at your computer, in a **local database**. Database server is not required
- Optional **server** is provided for support of syncing data over the network. Use this for backup and mutli user enviroments

## Stack - Heavy development

Main app is build with latest angular version and modules are been splitted in a feature based manner with lazy-load enabled route. Cross module communication is not currently supported.

Data management is heavily backed by rxdb. This node module handles PouchDB database instances and exposes observables. PouchDB, another excellent piece of software, allow to have local database in browser. Depending on the mode of the persistence required memory or indexdb/websql adapter is used.

Data synchronization strategy is subject to the configuration of the app. There are two   flows available.

The first one is to connect to an couch protocol enabled server (couchdb or pouchdb-server).

```
    client-1 --> rxdb --> pouchdb --> couchdb
    client-2 <-- rxdb <-- pouchdb <------/
```

This requires maintenance of the server and account management to b handled by the system administrator.

The second strategy is to connect with a server supporting graphql. Balnc server is using this strategy.

    client-1 --> rxdb --> server
    client-2 <-- rxdb <------/

In addition to that server could be sync allowing the desktop app to be synced with others. Experiments with IPFS are made for that matter

    server-1 <--> ipfs <--> server-2

When clients communications is over IPFS you have multiuser, offline first dapp. If you don't want to host a pin service or leave a client online, the consider pay a third party one.

## Modules

| Name          | Status | Description                                                                                         |
| ------------- | -----: | --------------------------------------------------------------------------------------------------- |
| Core          |    90% | Common libraries that are use across all other modules.                                             |
| Business      |    30% | Manage customers, orders, invoices.                                                                 |
| Projects      |    85% | Manage projects and tasks. Use this with sync and collaborate with others.                          |
| Presentations |    80% | Create presentations for clients. Use this with sync to have them in tablet and TV.                 |
| Boards        |    70% | An internal collaboration tool for communication and sharing files.                                 |
| Webpages      |     0% | Create landing pages and simple blogs. Generate static results and use with free hosting providers. |
| Reservations  |     0% | Manage reservations, asset planning.                                                                |

## Try It

You may use the latest unstable version (develop) at [https://balnc.cgeosoft.com](https://balnc.cgeosoft.com)

If you want to try it local:

```bash
# install lerna
npm i -g lerna

# clone the repo
git clone https://github.com/christosgeorgiou/balnc
cd balnc

# run lerna bootstrap
lerna bootstrap

# start the stack
npm start

# run server with docker
cd packages/server
docker-compose up -d
```

## Technologies

- Builded with [Angular](https://angular.io/)
- Themed with [Bootstrap](https://getbootstrap.com/)
- Data manage with [rxdb](https://github.com/pubkey/rxdb)

## Donate

This is a side project and more an experiment rather than a product. If you are that awesome person that want to donate, please keep in mind that I work on this on my free time and it will not be ready probably in the next 600 years.

[![liberapay](http://img.shields.io/liberapay/receives/cgeosoft.svg?logo=liberapay)](https://liberapay.com/cgeosoft/donate)

## License

The MIT License (MIT)
