import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const insertSymbol = mutation({
  args: {
    words: v.object({
      eng: v.string(),
      // Add more languages as needed
    }),
    imagePath: v.string(),
    audio: v.object({
      eng: v.object({
        default: v.string(),
        // Add more voices as needed
      }),
      // Add more languages as needed
    }),
    tags: v.optional(v.array(v.string())),
    usage: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("symbols", {
      words: args.words,
      imagePath: args.imagePath,
      audio: args.audio,
      tags: args.tags,
      usage: args.usage,
    });
  },
});

export const defaultImages = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("symbols").take(6);
  },
}); 