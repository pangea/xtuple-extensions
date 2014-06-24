{
  "name": "real_estate",
  "version": "0.0.1",
  "comment": "Real Estate extension",
  "loadOrder": 80,
  "dependencies": ["crm"],
  "databaseScripts": [
    "create_pangea_schema.sql",
    "real_estate_portfolio.sql",
    "real_estate_zone.sql",
    "real_estate_lease.sql",
    "real_estate_building.sql",
    "real_estate_unit.sql"
  ]
}
