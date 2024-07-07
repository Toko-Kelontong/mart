import {
    pgTable,
    varchar,
    serial,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    password: varchar("password", { length: 32 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    email: text("email").notNull().unique(),
    roles_id: uuid("roles_id").references(() => roles.id),
});

export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    descriptions: text("descriptions"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;
