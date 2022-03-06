CREATE TABLE "Product"
(
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"weight" DECIMAL NOT NULL,
	"id_category" integer NOT NULL,
	CONSTRAINT "Product_pk" PRIMARY KEY ("id")
)
WITH (
      OIDS=FALSE
    );



CREATE TABLE "Category"
(
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "Category_pk" PRIMARY KEY ("id")
)
WITH (
      OIDS=FALSE
    );



CREATE TABLE "Order"
(
	"id" serial NOT NULL,
	"approval_time" DATE,
	"id_order_state" integer NOT NULL,
	"user_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone_number" TEXT NOT NULL,
	CONSTRAINT "Order_pk" PRIMARY KEY ("id")
)
WITH (
      OIDS=FALSE
    );



CREATE TABLE "Order State"
(
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "Order State_pk" PRIMARY KEY ("id")
)
WITH (
      OIDS=FALSE
    );



CREATE TABLE "Products Ordered"
(
	"id" serial NOT NULL,
	"id_product" integer NOT NULL,
	"quantity" integer NOT NULL,
	"id_order" integer NOT NULL,
	CONSTRAINT "Products Ordered_pk" PRIMARY KEY ("id")
)
WITH (
      OIDS=FALSE
    );



ALTER TABLE "Product" ADD CONSTRAINT "Product_fk0" FOREIGN KEY ("id_category") REFERENCES "Category"("id");


ALTER TABLE "Order" ADD CONSTRAINT "Order_fk0" FOREIGN KEY ("id_order_state") REFERENCES "Order State"("id");


ALTER TABLE "Products Ordered" ADD CONSTRAINT "Products Ordered_fk0" FOREIGN KEY ("id_product") REFERENCES "Product"("id");
ALTER TABLE "Products Ordered" ADD CONSTRAINT "Products Ordered_fk1" FOREIGN KEY ("id_order") REFERENCES "Order"("id");
