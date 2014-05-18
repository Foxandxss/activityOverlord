# Activity Overlord

**Activity Overlord** is a project made by [Irl Nathan](https://twitter.com/irlnathan) for [SailsCasts](http://irlnathan.github.io/sailscasts/).

I made this project directly on version 0.10.rc7 so if you are like me and wants to code it directly on this version, this project serves as a reference.

Some of the changes are:

* On the project creation, there is no need to use `--linker` because now `/assets` serves the same purpose.
* Now the mongo setup goes on `config/connections.js` and `config/models.js`.
* The videos about `config/controllers.js` is now done in `config/blueprints.js`.
* I imported `custom.less` on an already created `importer.less`.
* What was done on the gruntfile, now is done on `tasks/pipeline.js`
* The client-side `app.js` got some major changes.
* The socket.io subscription did change, so check `/api/controllers/UserController.js#Subscribe` to see how it is done now.
* I decided to move the `beforeValidation` (`beforeValidate` in this version) into the `UserController`. It didn't work for me, maybe this is another change (confirmation?).