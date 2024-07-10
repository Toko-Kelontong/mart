
import { float} from "drizzle-orm/mysql-core";
import {
    pgTable,
    pgEnum,
    varchar,
    serial,
    text,
    timestamp,
    uuid,
    integer,
    real,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['failed', 'done', 'pending']);

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

export const payment = pgTable("payment", {
    id: uuid("id").primaryKey(),
    payment_amount: integer("payment_amount").notNull(),
    status: statusEnum("status").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(), 
    order_id: uuid("order_id").references(() => order.id),
    user_id: uuid("user_id").references(() => users.id)
});

export const cart = pgTable("cart", {
    id: uuid("id").primaryKey(),
    user_id: uuid("user_id").references(() => users.id),
    product_id: uuid("product_id").references(() => product.id),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow()
});

export const reviews = pgTable("reviews", {
    id: uuid("id").primaryKey(),
    product_id: uuid("product_id").references(() => product.id),
    user_id: uuid("user_id").references(() => users.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").notNull().defaultNow()

})

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
