import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  symbols: defineTable({
    imagePath: v.string(), // e.g., "symbols/apple.png"
    words: v.object({
      eng: v.string(), // English required for MVP and fallback
      // Add more languages as needed, e.g.:
      // spa: v.optional(v.string()),
      // fra: v.optional(v.string()),
    }),
    audio: v.object({
      eng: v.object({
        default: v.string(), // e.g., "audio/eng/default/apple.mp3"
        // Add more voices as needed
      }),
      // Add more languages as needed
      // spa: v.optional(v.object({ default: v.string() })),
    }),
    tags: v.optional(v.array(v.string())),
    usage: v.optional(v.number()),
  }),
}); 