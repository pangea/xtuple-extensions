select xt.create_table('pangea_unit', 'pangea');

select xt.add_column('pangea_unit','id', 'serial', 'primary key', 'pangea');
select xt.add_column('pangea_unit','unit_name', 'text', '', 'pangea');
select xt.add_column('pangea_unit','building_id', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','unit_type_id', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','created_at', 'timestamp', '', 'pangea');
select xt.add_column('pangea_unit','category', 'text', '', 'pangea');
select xt.add_column('pangea_unit','total_area', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','floor_number', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','address', 'text', '', 'pangea');
select xt.add_column('pangea_unit','city', 'text', '', 'pangea');
select xt.add_column('pangea_unit','state', 'text', '', 'pangea');
select xt.add_column('pangea_unit','zip_code', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','major_intersection', 'text', '', 'pangea');
select xt.add_column('pangea_unit','bedrooms', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','bathrooms', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','target_rent', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','target_deposit', 'integer', '', 'pangea');
select xt.add_column('pangea_unit','lease_id', 'integer', '', 'pangea');


comment on table pangea.unit is 'Pangea Units';
