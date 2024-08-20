const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    `
    ALTER TABLE public.admin_user ADD store_uuid uuid NULL;
    ALTER TABLE public.admin_user ADD CONSTRAINT admin_user_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
    `
  );

  // Create a trigger to build the url_key from the name if the url_key is not provided
  // await execute(
  //   connection,
  //   `CREATE TRIGGER "BUILD_STORE_URL_KEY_TRIGGER"
  //   BEFORE INSERT OR UPDATE ON store
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE build_url_key();`
  // );

  // // Create a trigger to build the url_key from the name if the url_key is not provided
  // await execute(
  //   connection,
  //   `CREATE TRIGGER "BUILD_REGION_URL_KEY_TRIGGER"
  //   BEFORE INSERT OR UPDATE ON region
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE build_url_key();`
  // );
};
