
import { float} from "drizzle-orm/mysql-core";
import {
    pgTable,
    varchar,
    serial,
    text,
    timestamp,
    uuid,
    integer,
    real,
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

export const product = pgTable("product", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    image: text("image").notNull(),
    descriptions: text("descriptions"),
    category_id: uuid("category_id").references(() => category.id),
});

export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    descriptions: text("descriptions"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const order = pgTable("order", {
    id: uuid("id").primaryKey(),
    order_date: timestamp("order_at").notNull().defaultNow(),
    total_price: real("total_price").notNull(),
    user_id: uuid("user_id").references(() => users.id)
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;

export type InsertOrder = typeof order.$inferInsert;
export type SelectOrder = typeof order.$inferSelect;
