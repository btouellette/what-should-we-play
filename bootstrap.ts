import * as concurrently from 'concurrently';

concurrently([
  "yarn run dev-client",
  "yarn run dev-server"
], {
  killOthers: ['failure', 'success'],
  restartTries: 3,
}).then(
    function onSuccess(exitInfo) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed successfully.
      process.exit();
    },
    function onFailure(exitInfo) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed because of a failure.
      process.exit();
    }
  );
