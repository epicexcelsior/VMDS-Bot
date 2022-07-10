import { Channel, Client, GuildMember, Message, MessageEmbed, PartialDMChannel, Role, User } from "discord.js";
export interface IWhatAmICallback {
    (param: WhatAmICallbackParam): void;
}
export declare type WhatAmI = "member" | "channel" | "role" | "message" | "not found";
export interface WhatAmICallbackParam {
    entity: GuildMember | PartialDMChannel | Channel | Message | Role | undefined;
    whatAmI?: WhatAmI;
}
export interface ChannelPerm {
    Id: number;
    name: string;
    type: "text" | "voice";
    aliases: string[];
}
/**
 *
 * @param {string} body Description of message embed.
 * @param {string} title Title of message embed. Default: "Info:"
 * @param {*} client The client that instantiated this (visible in title)
 * @param {*} perpetrator Discord.User that used the command (tagged in footer)
 * @returns
 */
export declare function embed(body: any, title?: string, perpetrator?: User | null, client?: Client | null): MessageEmbed;
/**
 * Trims mentions to Ids. For instance, "`<@KifoPL>`" returns "`KifoPL`", "`<@&123123123>`" returns "`123123123`", "`42069`" returns "`42069`".
 * @param {string} mention the mention to trim
 * @returns raw Id as a string
 */
export declare function mentionTrim(mention: string): string;
/**
 * Returns Id of emoji, really handy for handling reactions, etc.
 * @param {*} emojiIdentifier The <a:name:id>, <:name:id>, a:name:id or name:id emoji identifier string of an emoji
 * @returns emoji Id
 */
export declare function emojiTrim(emojiIdentifier: string): string;
/**
 *
 * @param {number} number the place
 * @returns number with place abbreviation: for `1` returns `1st`, `2` - `2nd`, etc...
 */
export declare function place(number: number): string;
/**
 *
 * @param {*} message The message sent
 * @param {*} whatIsThis The argument in question (either mention or Id)
 * @param {*} allowWords True if "me" results in member and "here" in channel (case in-sensitive), false otherwise.
 * @param {*} callback { entity: `GuildMember` or `GuildChannel` or `GuildRole` or `GuildMessage` or `undefined`, whatAmI: "member" or "channel" or "role" or "message" or "not found" (that's because if the function breaks, it will return `undefined`, + it's easier to do if statements)}
 * @returns
 */
export declare function whatAmIFunc(message: Message, whatIsThis: string, allowWords: boolean | undefined, callback: IWhatAmICallback): Promise<void>;
/**
 * @returns regex fitting discord mentions, like <@!KifoPL#3358>, <@289119054130839552>, etc. (works for members, roles, channels
 */
export declare function mentionRegEx(): RegExp;
/**
 *
 * @returns RegEx fitting all Unicode Emojis
 */
export declare function emojiRegex(): RegExp;
/**
 *
 * @returns RegEx fitting all URLs starting with http:// or https://
 */
export declare function urlRegex(): RegExp;
/**
 * Id, name, type, aliases of channel perms.
 */
export declare const channelPerms: ChannelPerm[];
