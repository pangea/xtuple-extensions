select xt.create_table('real_estate_lease', 'pangea');

select xt.add_column('real_estate_lease','id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_lease','unit_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_lease','promo_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_lease','created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease','updated_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease','type', 'text', '', 'pangea');

comment on table pangea.real_estate_lease is 'Real Estate Leases';
