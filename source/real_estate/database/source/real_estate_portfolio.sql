select xt.create_table('real_estate_portfolio', 'pangea');

select xt.add_column('real_estate_portfolio','id', 'serial', 'primary key', 'pangea');
select xt.add_column('real_estate_portfolio','name', 'text', '', 'pangea');
select xt.add_column('real_estate_portfolio','account_id', 'integer', '', 'pangea');
select xt.add_column('real_estate_portfolio','created_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_portfolio','updated_at', 'timestamp', '', 'pangea');
select xt.add_column('real_estate_portfolio','bank_account', 'text', '', 'pangea');
select xt.add_column('real_estate_portfolio','accounting_closing_date', 'timestamp', '', 'pangea');

comment on table pangea.real_estate_portfolio is 'Real Estate Portfolio';
