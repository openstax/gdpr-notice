# user-tracking-notice

manages country lookup and acknowledged cookie

this package:
 - determines client location by ip address
 - helps not show notice and not track individualized data in GDPR countries.
 - saves an acknowledged cookie so that the notice will not be shown over and over to the same user

this package does not:
 - actuall render a notice on the screen.

API

**canTrackUser**

takes a callback that will be invoked if the notice needs to be shown, the callback should return a promise that is resolved when the notice is acknowledged.

arguments:
 - notice: callback that will be called when notice should be shown, should return a promise that is resolved when the notice is acknowledged.
 - register: callback that will be called when it is safe to register the user's id with analytics. 

returns a promise that resolves with a boolean for if it is safe to register (same functionality as the register callback) and will be rejected with any errors encountered.
