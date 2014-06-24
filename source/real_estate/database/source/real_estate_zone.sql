select xt.create_table('real_estate_zone', 'pangea');

select xt.add_column('real_estate_zone','id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_zone','name', 'text', '', 'pangea');       
select xt.add_column('real_estate_zone','portfolio_id', 'integer', '', 'pangea');       
select xt.add_column('real_estate_zone','created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_zone','updated_at', 'timestamp', '', 'pangea');

comment on table pangea.real_estate_zone is 'Real Estate Zone';
