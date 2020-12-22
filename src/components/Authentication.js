export function isLoggedIn() {
    return localStorage.getItem("usertoken")!==null && localStorage.getItem("usertoken")!=="undefined";
  }
  
  export function deleteTokens(){
      localStorage.removeItem("usertoken");
  }
  export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }