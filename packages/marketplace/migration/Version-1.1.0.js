const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    `
    ALTER TABLE public.attribute ADD store_uuid UUID NULL;
ALTER TABLE public.attribute ADD CONSTRAINT attribute_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.attribute_group ADD store_uuid UUID NULL;
ALTER TABLE public.attribute_group ADD CONSTRAINT attribute_group_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.attribute_group_link ADD store_uuid UUID NULL;
ALTER TABLE public.attribute_group_link ADD CONSTRAINT attribute_group_link_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.attribute_option ADD store_uuid UUID NULL;
ALTER TABLE public.attribute_option ADD CONSTRAINT attribute_option_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.cart ADD store_uuid UUID NULL;
ALTER TABLE public.cart ADD CONSTRAINT cart_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.cart_address ADD store_uuid UUID NULL;
ALTER TABLE public.cart_address ADD CONSTRAINT cart_address_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.cart_item ADD store_uuid UUID NULL;
ALTER TABLE public.cart_item ADD CONSTRAINT cart_item_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.category ADD store_uuid UUID NULL;
ALTER TABLE public.category ADD CONSTRAINT category_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.category_description ADD store_uuid UUID NULL;
ALTER TABLE public.category_description ADD CONSTRAINT category_description_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.cms_page ADD store_uuid UUID NULL;
ALTER TABLE public.cms_page ADD CONSTRAINT cms_page_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.cms_page_description ADD store_uuid UUID NULL;
ALTER TABLE public.cms_page_description ADD CONSTRAINT cms_page_description_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.collection ADD store_uuid UUID NULL;
ALTER TABLE public.collection ADD CONSTRAINT collection_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.coupon ADD store_uuid UUID NULL;
ALTER TABLE public.coupon ADD CONSTRAINT coupon_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.customer ADD store_uuid UUID NULL;
ALTER TABLE public.customer ADD CONSTRAINT customer_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.customer_address ADD store_uuid UUID NULL;
ALTER TABLE public.customer_address ADD CONSTRAINT customer_address_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.customer_group ADD store_uuid UUID NULL;
ALTER TABLE public.customer_group ADD CONSTRAINT customer_group_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.event ADD store_uuid UUID NULL;
ALTER TABLE public.event ADD CONSTRAINT event_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.migration ADD store_uuid UUID NULL;
ALTER TABLE public.migration ADD CONSTRAINT migration_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.order ADD store_uuid UUID NULL;
ALTER TABLE public.order ADD CONSTRAINT order_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.order_activity ADD store_uuid UUID NULL;
ALTER TABLE public.order_activity ADD CONSTRAINT order_activity_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.order_address ADD store_uuid UUID NULL;
ALTER TABLE public.order_address ADD CONSTRAINT order_address_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.order_item ADD store_uuid UUID NULL;
ALTER TABLE public.order_item ADD CONSTRAINT order_item_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.payment_transaction ADD store_uuid UUID NULL;
ALTER TABLE public.payment_transaction ADD CONSTRAINT payment_transaction_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product ADD store_uuid UUID NULL;
ALTER TABLE public.product ADD CONSTRAINT product_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_attribute_value_index ADD store_uuid UUID NULL;
ALTER TABLE public.product_attribute_value_index ADD CONSTRAINT product_attribute_value_index_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_collection ADD store_uuid UUID NULL;
ALTER TABLE public.product_collection ADD CONSTRAINT product_collection_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_custom_option ADD store_uuid UUID NULL;
ALTER TABLE public.product_custom_option ADD CONSTRAINT product_custom_option_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_custom_option_value ADD store_uuid UUID NULL;
ALTER TABLE public.product_custom_option_value ADD CONSTRAINT product_custom_option_value_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_description ADD store_uuid UUID NULL;
ALTER TABLE public.product_description ADD CONSTRAINT product_description_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_image ADD store_uuid UUID NULL;
ALTER TABLE public.product_image ADD CONSTRAINT product_image_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.product_inventory ADD store_uuid UUID NULL;
ALTER TABLE public.product_inventory ADD CONSTRAINT product_inventory_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.region ADD store_uuid UUID NULL;
ALTER TABLE public.region ADD CONSTRAINT region_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.region_description ADD store_uuid UUID NULL;
ALTER TABLE public.region_description ADD CONSTRAINT region_description_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.reset_password_token ADD store_uuid UUID NULL;
ALTER TABLE public.reset_password_token ADD CONSTRAINT reset_password_token_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.seller_user ADD store_uuid UUID NULL;
ALTER TABLE public.seller_user ADD CONSTRAINT seller_user_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.session ADD store_uuid UUID NULL;
ALTER TABLE public.session ADD CONSTRAINT session_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.setting ADD store_uuid UUID NULL;
ALTER TABLE public.setting ADD CONSTRAINT setting_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.shipment ADD store_uuid UUID NULL;
ALTER TABLE public.shipment ADD CONSTRAINT shipment_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.shipping_method ADD store_uuid UUID NULL;
ALTER TABLE public.shipping_method ADD CONSTRAINT shipping_method_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.shipping_zone ADD store_uuid UUID NULL;
ALTER TABLE public.shipping_zone ADD CONSTRAINT shipping_zone_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.shipping_zone_method ADD store_uuid UUID NULL;
ALTER TABLE public.shipping_zone_method ADD CONSTRAINT shipping_zone_method_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.shipping_zone_province ADD store_uuid UUID NULL;
ALTER TABLE public.shipping_zone_province ADD CONSTRAINT shipping_zone_province_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.store ADD store_uuid UUID NULL;
ALTER TABLE public.store ADD CONSTRAINT store_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.store_description ADD store_uuid UUID NULL;
ALTER TABLE public.store_description ADD CONSTRAINT store_description_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.tax_class ADD store_uuid UUID NULL;
ALTER TABLE public.tax_class ADD CONSTRAINT tax_class_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.tax_rate ADD store_uuid UUID NULL;
ALTER TABLE public.tax_rate ADD CONSTRAINT tax_rate_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.url_rewrite ADD store_uuid UUID NULL;
ALTER TABLE public.url_rewrite ADD CONSTRAINT url_rewrite_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
ALTER TABLE public.variant_group ADD store_uuid UUID NULL;
ALTER TABLE public.variant_group ADD CONSTRAINT variant_group_fk FOREIGN KEY (store_uuid) REFERENCES public.store("uuid");
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
