do $$
   var sql = "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'im'",
       res = plv8.execute(sql);

   if(!res.length) {
     plv8.execute("CREATE SCHEMA im;  GRANT ALL ON SCHEMA im TO GROUP xtrole;");
   }
$$ language plv8;
