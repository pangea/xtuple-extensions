[
  {
    "context": "message",
    "nameSpace": "XM",
    "type": "MessageMessage",
    "table": "im.message",
    "idSequenceName": "im.recipient_recipient_id_seq",
    "lockable": true,
    "comment": "Message Map",
    "privileges": {
      "all": {
        "create": true,
        "read": true,
        "update": false,
        "delete": false
      },
      "personal": {
        "update": "EditOwnMessages",
        "properties": ["sender"]
      }
    },
    "properties": [
      {
        "name": "id",
        "attr": {
          "type": "Number",
          "column": "comment_id",
          "isPrimaryKey": true
        }
      },
      {
        "name": "sender",
        "attr": {
          "type": "String",
          "column": "comment_user",
          "isNaturalKey": true
        }
      },
      {
        "name": "recipients",
        "attr": {
          "type": "String",
          "column": "recipient_names"
        }
      },
      {
        "name": "createdAt",
        "attr": {
          "type": "Date",
          "column": "comment_date"
        }
      },
      {
        "name": "body",
        "attr": {
          "type": "String",
          "column": "comment_text"
        }
      },
      {
        "name": "isPublic",
        "attr": {
          "type": "Boolean",
          "column": "comment_public"
        }
      },
      {
        "name": "source",
        "attr": {
          "type": "String",
          "column": "comment_source"
        }
      }
    ],
    "isSystem": true
  }
]
