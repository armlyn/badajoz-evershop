const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    `CREATE TABLE "«reward»" (
      "reward_id" INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
      "uuid" UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
      "seller_user_id" INT REFERENCES "seller_user"("seller_user_id") ON DELETE CASCADE,
      "name" VARCHAR(255) NOT NULL,
      "description" TEXT DEFAULT NULL,
      "points_required" INT NOT NULL,
      "status" BOOLEAN NOT NULL DEFAULT TRUE,
      "start_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      "end_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`
  );

};
