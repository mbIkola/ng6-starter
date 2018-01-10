import * as vis from '@uirouter/visualizer';

function AppRun(Auth, $rootScope, $state, $trace, $uiRouter, $transitions, Analytics) {
  "ngInject";

  $rootScope.$on("event:signinRequest", function (event, data) {
    console.log("receviced:signinRequest");
    $state.go('app.signin');
  });

  $rootScope.$on("event:logoutRequest", function (event, data) {
    console.log("receviced:logoutRequest");
    Auth.logout();
    $state.go('app.signin');
  });

  $trace.enable('TRANSITION');

  //show the routing graph
  //vis.visualizer($uiRouter);

  //processing auth redirecting
  function redirectToOnCondition(destination, condition) {
    return (trans) => {
      let $state = trans.router.stateService;
      let _Auth = trans.injector().get('Auth');
      if (condition(Auth, $state)) {
        return $state.target(destination);
      }
    }
  }

  let redirectToLoginWhenUnauthorized = redirectToOnCondition('app.signin', (auth) => !auth.isAuthenticated() );
  let redirectToProfileWhenAuthorized = redirectToOnCondition('app.profile',(auth) => auth.isAuthenticated() );

  $transitions.onStart(
    { to: (state) => !!state.data.requiresAuth } , redirectToLoginWhenUnauthorized
  );

  $transitions.onStart(
    { to: (state) => !!state.data.requiresGuest }, redirectToProfileWhenAuthorized
  );

};

export default AppRun;
