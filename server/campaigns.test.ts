import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(user: AuthenticatedUser | null = null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => undefined,
    } as TrpcContext["res"],
  };
}

const sampleUser: AuthenticatedUser = {
  id: 7,
  authSubject: "campaign-test-user",
  email: "campaign@example.com",
  name: "Campaign Tester",
  loginMethod: "google.com",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("campaign procedures", () => {
  it("returns an empty public campaign list when no campaigns are available", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.campaigns.featured()).resolves.toEqual([]);
  });

  it("requires authentication before creating a draft", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.campaigns.createDraft({
        title: "A valid campaign title",
        story: "A sufficiently detailed story about the need and the intended use of funds.",
        category: "medical",
        beneficiaryName: "Amina Yusuf",
        relationship: "My mother",
        goalAmountMinor: 50000000,
      })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects incomplete draft input before persistence", async () => {
    const caller = appRouter.createCaller(createContext(sampleUser));

    await expect(
      caller.campaigns.createDraft({
        title: "Too short",
        story: "Too brief",
        category: "medical",
        beneficiaryName: "Amina Yusuf",
        relationship: "My mother",
        goalAmountMinor: 50000000,
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
