# gdpr-notice

manages country lookup and acknowledged cookie

this package:
 - determines if GDPR notice should be shown based on the client ip address. we try to make sure our country mapping is up to date but are not responsible if its not.
 - saves an acknowledged cookie so that the notice will not be shown over and over to the same user

this package does not:
 - actuall render a notice on the screen. the first argument to the `acknowledgeGdprNotice` function will be called if the notice needs to be shown, and should return a promise that resolves when the notice is acknowledged.
