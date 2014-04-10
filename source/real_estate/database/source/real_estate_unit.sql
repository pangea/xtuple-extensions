select xt.create_table('real_estate_unit', 'pangea');

select xt.add_column('real_estate_unit','id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_unit','unit_name', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','building_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','unit_type_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_unit','category', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','total_area', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','floor_number', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','address', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','city', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','state', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','zip_code', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','major_intersection', 'text', '', 'pangea');
select xt.add_column('real_estate_unit','bedrooms', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','bathrooms', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','target_rent', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','target_deposit', 'integer', '', 'pangea');
select xt.add_column('real_estate_unit','lease_id', 'integer', '', 'pangea');

comment on table pangea.real_estate_unit is 'Real Estate Units';
