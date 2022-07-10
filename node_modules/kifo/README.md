# kifo

NPM package to make the Kifo Clanker™ cleaner and easier to manage.

## Installation

1. `npm install kifo` in your terminal
1. `const kifo = require("kifo");` in your code

... and that's it!

> make sure you have [`npm`](https://www.npmjs.com/get-npm) installed.

## Features

> Main usage of this package is to help develop Kifo Clanker™. However, there are some actually useful features that other bot developers could use (like RegExs).

### `embed(body, title = "Info:", perpetrator = null, client = null)`

converts string (`body`) with optional title to `embed message`.

> -   `perpetrator` - `Discord.User` that used the command (visible in footer)
> -   `client` - `Discord.Client` that instantiated this (visible in title)

### `mentionTrim(mention)`

Trims mentions to Ids. For instance, "`<@KifoPL>`" returns "`KifoPL`", "`<@&123123123>`" returns "`123123123`", "`42069`" returns "`42069`".

> -   `mention` - `string` to trim.

### `emojiTrim(emojiIdentifier)`

Returns Id of emoji, really handy for handling reactions, etc.

> -   `emojiIdentifier` - The `<a:name:id>`, `<:name:id>`, `a:name:id` or `name:id` emoji identifier `string` of an emoji

### `place(number)`

returns number with place abbreviation: for `1` returns `1st`, `2` - `2nd`, etc...
> `number` - the place

### `whatAmIFunc(message, whatisthis, allowWords, callback)`

Determines, what the mention or Id is.

> -   `message` - The message sent
> -   `whatisthis` - The argument in question (either mention or Id)
> -   `allowWords` - True if "me" results in member and "here" in channel (case in-sensitive), false otherwise.
> -   `callback` -

```js
{
	entity: Discord.GuildMember || Discord.GuildChannel || Discord.GuildRole || Discord.Message || undefined,
	whatAmI: "member" || "channel" || "role" || "message" || "not found" //(that's because if the function breaks, it will return `undefined`, + it's easier to do if statements)
}
```

### `emojiRegex`

Returns `RegEx` fitting all Unicode Emojis.

### `urlRegex`

Returns `RegEx` fitting all URLs starting with `http://` or `https://`

### `channelPerms`

Returns array with `Id`, `name`, `type`, `aliases` of `channel perms`.

#### example:

```js
	[
		(VIEW_CHANNEL = {
		Id: 1,
		name: "VIEW_CHANNEL",
		type: "text",
		aliases: ["view", "vch"],
	}),
	...
	]
```

## Links

-   [my links](https://bio.link/KifoPL)
-   [npm package site](https://www.npmjs.com/package/kifo),
-   [The Galactic Republic Discord Server](https://discord.gg/invite/thegalacticrepublic)
-   [Discord Support Server](https://discord.com/invite/HxUFQCxPFp)
-   [PayPal](https://paypal.me/Michal3run) - _(electricity and internet bills cost a lot of money, donations motivate me to continue my work developing this package and the bot)_
