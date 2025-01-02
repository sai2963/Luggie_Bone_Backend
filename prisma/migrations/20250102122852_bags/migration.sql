-- CreateTable
CREATE TABLE "Bags" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" VARCHAR(50) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "quantity" VARCHAR(50) NOT NULL,
    "features" TEXT NOT NULL,
    "manufacturedBy" VARCHAR(255) NOT NULL,
    "materialCare" TEXT NOT NULL,
    "terms" TEXT NOT NULL,

    CONSTRAINT "Bags_pkey" PRIMARY KEY ("id")
);
