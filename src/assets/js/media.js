function mediaqueryresponse(mql){
 if (mql.matches){ // if media query matches
  console.log("The condition " + mql.media + " has been met")
 }
 else{
  console.log("Condition not met yet")
 }
}

var mql = window.matchMedia("screen and (max-width: 320px)")
mediaqueryresponse(mql) // call listener function explicitly at run time
mql.addListener(mediaqueryresponse) // attach listener function to listen in on state changes