SELECT xt.create_table('recipient', 'im');

SELECT xt.add_column('recipient', 'recipient_id', 'serial', 'primary key', 'im');
SELECT xt.add_column('recipient', 'recipient_comment_id', 'integer', 'references comment (comment_id)', 'im');
SELECT xt.add_column('recipient', 'recipient_name', 'text', '', 'im');

COMMENT ON TABLE im.recipient IS 'Message recipients';
