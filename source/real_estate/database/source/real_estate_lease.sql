select xt.create_table('real_estate_lease', 'pangea');

select xt.add_column('real_estate_lease', 'id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_lease', 'unit_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_lease', 'crmacct_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_lease', 'start_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'end_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'move_in_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'vacated_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'reason_for_leaving', 'text', '', 'pangea');
select xt.add_column('real_estate_lease', 'scheduled_move_out_date', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'status', 'text', '', 'pangea');
select xt.add_column('real_estate_lease', 'public_assistance_program', 'text', '', 'pangea');
select xt.add_column('real_estate_lease', 'moved_within', 'boolean', '', 'pangea');
select xt.add_column('real_estate_lease', 'created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'updated_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_lease', 'type', 'text', '', 'pangea');

comment on table pangea.real_estate_lease is 'Real Estate Leases';
