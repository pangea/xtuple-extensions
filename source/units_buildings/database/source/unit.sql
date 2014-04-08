select xt.create_table('unit', 'pangea');

select xt.add_column('unit','id', 'serial', 'primary key', 'pangea');
select xt.add_column('unit','unit_name', 'text', '', 'pangea');
select xt.add_column('unit','building_id', 'integer', '', 'pangea');
select xt.add_column('unit','unit_type_id', 'integer', '', 'pangea');
select xt.add_column('unit','created_at', 'timestamp', '', 'pangea');
select xt.add_column('unit','category', 'text', '', 'pangea');
select xt.add_column('unit','total_area', 'integer', '', 'pangea');
select xt.add_column('unit','floor_number', 'integer', '', 'pangea');
select xt.add_column('unit','address', 'text', '', 'pangea');
select xt.add_column('unit','city', 'text', '', 'pangea');
select xt.add_column('unit','state', 'text', '', 'pangea');
select xt.add_column('unit','zip_code', 'integer', '', 'pangea');
select xt.add_column('unit','major_intersection', 'text', '', 'pangea');
select xt.add_column('unit','bedrooms', 'integer', '', 'pangea');
select xt.add_column('unit','bathrooms', 'integer', '', 'pangea');
select xt.add_column('unit','target_rent', 'integer', '', 'pangea');
select xt.add_column('unit','target_deposit', 'text', '', 'pangea');
select xt.add_column('unit','lease_id', 'integer', '', 'pangea');


comment on table pangea.unit is 'Units';
