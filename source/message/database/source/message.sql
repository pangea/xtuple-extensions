SELECT xt.create_view('im.message', $$

       select * from (
              select comment.comment_id as comment_id_dup, 
                     string_agg(recipient.recipient_name, ',') as recipient_names
              from comment 
              join im.recipient as recipient on (recipient.recipient_comment_id = comment.comment_id) group by comment.comment_id
              ) as comments
       join comment as comments_detail on comments.comment_id_dup = comments_detail.comment_id;
       
$$, false);

create or replace function im.insert_message(newMessage im.message) returns boolean as $$
           var comment_sql = 'insert into comments(' + 
                             ' comment_id,' + 
                             ' comment_source_id,' + 
                             ' comment_date,' +
                             ' comment_text,' +
                             ' comment_cmnttype_id,' +
                             ' comment_source,' +
                             ' comment_public,' +
                             ' obj_uuid' +
                             ') values (' +
                               newMessage.comment_id + ',' + 
                               newMessage.comment_source_id + ',' + 
                               newMessage.comment_date + ',' +
                               newMessage.comment_text + ',' +
                               newMessage.comment_cmnttype_id + ',' +
                               newMessage.comment_source + ',' +
                               newMessage.comment_public + ',' +
                               newMessage.obj_uuid +
                             ');',
               recipient_sql = 'insert into recipient(' +
                               ' recipient_comment_id,' +
                               ' recipient_name' +
                               ') values (' +
                                 newMessage.comment_id + ',' +
                               ' {name}' +
                               ');',
               recipients = newMessage.recipient_names.split(',');

           plv8.execute(comment_sql);
  
           recipients.forEach(function(name) {
             plv8.execute(recipient_sql.replace('{name}', name));
           });

           return true;
  
         $$ language plv8;

       create or replace rule "_CREATE" as on insert to im.message
         do instead select im.insert_message(new);

       create or replace rule "_UPDATE" as on update to im.message
         do instead
            update comment set
              comment_text = new.comment_text,
              comment_public = new.comment_public,
              obj_uuid = new.obj_uuid
            where comment_id = old.comment_id;

       create or replace rule "_DELETE" as on delete to im.message
         do instead nothing;
