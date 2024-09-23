# Logger type purposes

This list will explain each logger type, what they're for, and when you should use them.

* `Trace` - This is `Debug`, but on steroids. It's not afraid to spam the console. You should use this if a piece of
code gets called a lot
* `Debug` - Information that you might not need to know in production. Use `Trace` if it gets logged too often
* `Info` - The de facto standard. The crème de la crème. <!-- can you tell I don't speak french? --> This will fit most
messages. It's the default type, too
* `Warn` - Tell when something went a little wrong
* `Error` - Should be used when an error occurred <sub><sup>Wow, Einstein, tell us more!</sup></sub>
* `Fatal` - Same as `Error`, but for ones that can/will cause massive problems, like the program crashing