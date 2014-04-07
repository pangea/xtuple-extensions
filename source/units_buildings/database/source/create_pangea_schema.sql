do $$
  /* Only create the schema if it hasn't been created already */
  var res, sql = "select schema_name from information_schema.schemata where schema_name = 'pangea'",
  res = plv8.execute(sql);
  if (!res.length) {
    sql = "create schema pangea; grant all on schema pangea to group xtrole;"
    plv8.execute(sql);
  }
$$ language plv8;
