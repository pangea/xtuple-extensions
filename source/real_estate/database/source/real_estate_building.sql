select xt.create_table('real_estate_building', 'pangea');

select xt.add_column('real_estate_building','id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_building','building_name', 'text', '', 'pangea');
select xt.add_column('real_estate_building','portfolio_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','building_type_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','office_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','promo_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','parking_vendor_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_building','updated_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_building','asset_acquisition_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_building','asset_sale_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_building','asset_purchase_price', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','category', 'text', '', 'pangea');
select xt.add_column('real_estate_building','total_area', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','floors', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','address', 'text', '', 'pangea');
select xt.add_column('real_estate_building','city', 'text', '', 'pangea');
select xt.add_column('real_estate_building','state', 'text', '', 'pangea');
select xt.add_column('real_estate_building','zip_code', 'integer', '', 'pangea');
select xt.add_column('real_estate_building','neighborhood', 'text', '', 'pangea');
select xt.add_column('real_estate_building','community_name', 'text', '', 'pangea');
select xt.add_column('real_estate_building','leasing_agency_approved', 'boolean', '', 'pangea');
select xt.add_column('real_estate_building','unit_count', 'integer', '', 'pangea');


comment on table pangea.real_estate_building is 'Real Estate Buildings';
