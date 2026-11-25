import {
    pgTable,
    uuid,
    timestamp,
    uniqueIndex,
    index,
    pgEnum,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { users } from "./users";

export const membershipRoleEnum = pgEnum("membership_role", [
    "owner",
    "admin",
    "dispatcher",
    "driver",
]);

export const membershipStatusEnum = pgEnum("membership_status", [
    "active",
    "invited",
    "suspended",
]);

export const memberships = pgTable(
    "memberships",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        organizationId: uuid("organization_id")
            .notNull()
            .references(() => organizations.id, { onDelete: "cascade" }),

        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        role: membershipRoleEnum("role").notNull().default("dispatcher"),
        status: membershipStatusEnum("status").notNull().default("active"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex("memberships_organization_user_unique").on(
            table.organizationId,
            table.userId,
        ),
        index("memberships_user_id_idx").on(table.userId),
    ],
);