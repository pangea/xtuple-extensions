select xt.create_table('pangea_building', 'pangea');

select xt.add_column('pangea_building','id', 'serial', 'primary key', 'pangea');
select xt.add_column('pangea_building','building_name', 'text', '', 'pangea');
select xt.add_column('pangea_building','portfolio_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','zone_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','building_type_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','office_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','promo_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','parking_vendor_id', 'integer', '', 'pangea');
select xt.add_column('pangea_building','created_at', 'timestamp', '', 'pangea');
select xt.add_column('pangea_building','updated_at', 'timestamp', '', 'pangea');
select xt.add_column('pangea_building','asset_acquisition_date', 'timestamp', '', 'pangea');
select xt.add_column('pangea_building','asset_sale_date', 'timestamp', '', 'pangea');
select xt.add_column('pangea_building','asset_purchase_price', 'integer', '', 'pangea');
select xt.add_column('pangea_building','category', 'text', '', 'pangea');
select xt.add_column('pangea_building','total_area', 'integer', '', 'pangea');
select xt.add_column('pangea_building','floors', 'integer', '', 'pangea');
select xt.add_column('pangea_building','address', 'text', '', 'pangea');
select xt.add_column('pangea_building','city', 'text', '', 'pangea');
select xt.add_column('pangea_building','state', 'text', '', 'pangea');
select xt.add_column('pangea_building','zip_code', 'integer', '', 'pangea');
select xt.add_column('pangea_building','neighborhood', 'text', '', 'pangea');
select xt.add_column('pangea_building','community_name', 'text', '', 'pangea');
select xt.add_column('pangea_building','leasing_agency_approved', 'boolean', '', 'pangea');
select xt.add_column('pangea_building','unit_count', 'integer', '', 'pangea');


comment on table pangea.building is 'Pangea Buildings';
