# Expo Linking.getInitialURL() Inconsistent null Return

This repository demonstrates a bug in Expo's `Linking.getInitialURL()` API where it sometimes returns `null` even when the app is launched from a deep link. This inconsistency makes reliable deep link handling difficult.

## Bug Description

The `Linking.getInitialURL()` method is used to retrieve the URL that launched the app.  However, in certain scenarios (seemingly random), this method returns `null`, even when a valid deep link was used to open the application.  This leads to unexpected behavior in apps relying on deep links for navigation.

## Reproduction

1. Clone this repository.
2. Run `npm install`.
3. Run the app on a device or emulator.
4. Open a deep link. Note that the app might successfully or unsuccessfully capture the deeplink depending on timing and environment.
5. Observe the console logs.  You will see that `getInitialURL` inconsistently returns null or the deeplink itself.

## Solution

The solution is to implement a retry mechanism using `setTimeout` or other timers to repeatedly call `getInitialURL()` until it provides a valid value or a timeout is reached. This increases robustness.   We also incorporate an event listener to capture the URL when the app is resumed if the initial check is failed.

## Additional Notes

This issue is likely related to the timing of the app's initialization and the availability of the URL from the system.  This might relate to background processes of the Operating System itself. A more reliable approach may involve using a different method or framework for handling deep links, depending on the complexity of the required navigation.