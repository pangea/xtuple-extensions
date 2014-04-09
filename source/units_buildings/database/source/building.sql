select xt.create_table('building', 'pangea');

select xt.add_column('building','id', 'serial', 'primary key', 'pangea');
select xt.add_column('building','building_name', 'text', '', 'pangea');
select xt.add_column('building','portfolio_id', 'integer', '', 'pangea');
select xt.add_column('building','zone_id', 'integer', '', 'pangea');
select xt.add_column('building','building_type_id', 'integer', '', 'pangea');
select xt.add_column('building','office_id', 'integer', '', 'pangea');
select xt.add_column('building','promo_id', 'integer', '', 'pangea');
select xt.add_column('building','parking_vendor_id', 'integer', '', 'pangea');
select xt.add_column('building','created_at', 'timestamp', '', 'pangea');
select xt.add_column('building','updated_at', 'timestamp', '', 'pangea');
select xt.add_column('building','asset_acquisition_date', 'timestamp', '', 'pangea');
select xt.add_column('building','asset_sale_date', 'timestamp', '', 'pangea');
select xt.add_column('building','asset_purchase_price', 'integer', '', 'pangea');
select xt.add_column('building','category', 'text', '', 'pangea');
select xt.add_column('building','total_area', 'integer', '', 'pangea');
select xt.add_column('building','floors', 'integer', '', 'pangea');
select xt.add_column('building','address', 'text', '', 'pangea');
select xt.add_column('building','city', 'text', '', 'pangea');
select xt.add_column('building','state', 'text', '', 'pangea');
select xt.add_column('building','zip_code', 'integer', '', 'pangea');
select xt.add_column('building','neighborhood', 'text', '', 'pangea');
select xt.add_column('building','community_name', 'text', '', 'pangea');
select xt.add_column('building','leasing_agency_approved', 'boolean', '', 'pangea');
select xt.add_column('building','unit_count', 'integer', '', 'pangea');


comment on table pangea.building is 'Buildings';
