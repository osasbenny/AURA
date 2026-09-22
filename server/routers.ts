import { COOKIE_NAME } from "@shared/const";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createCampaignDraft, getCampaignsByCreatorId, getPublishedCampaigns } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

const campaignDraftInput = z.object({
  title: z.string().trim().min(4).max(160),
  story: z.string().trim().min(20).max(5000),
  category: z.enum(["medical", "emergency", "education", "community"]),
  beneficiaryName: z.string().trim().min(2).max(160),
  relationship: z.string().trim().min(2).max(120),
  goalAmountMinor: z.number().int().positive().max(10_000_000_000),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  campaigns: router({
    featured: publicProcedure.query(() => getPublishedCampaigns()),
    mine: protectedProcedure.query(({ ctx }) => getCampaignsByCreatorId(ctx.user.id)),
    createDraft: protectedProcedure
      .input(campaignDraftInput)
      .mutation(async ({ ctx, input }) => {
        try {
          return await createCampaignDraft({
            ...input,
            slug: `aura-${nanoid(10).toLowerCase()}`,
            creatorId: ctx.user.id,
            currency: "NGN",
            raisedAmountMinor: 0,
            status: "DRAFT",
          });
        } catch (error) {
          console.error("[Campaigns] Failed to create draft", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "We could not save this draft. Please try again.",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
