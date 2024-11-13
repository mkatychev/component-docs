(comment) @comment @spell

(ty
  (id)) @type

(package_decl
  (id) @module)

(valid_semver) @string

(world_item
  name: (id) @module)

(interface_item
  name: (id) @module)

(import_item
  name: (id) @module
  (extern_type
    (interface_body)))

(import_item
  name: (id) @function
  (extern_type
    (func_type)))

(export_item
  name: (id) @module
  (extern_type
    (interface_body)))

(export_item
  name: (id) @function
  (extern_type
    (func_type)))

(type_item
  alias: (id) @type)

(func_item
  name: (id) @function)

(handle
  (id) @type)

(named_type
  name: (id) @variable)

(record_item
  name: (id) @type)

(record_field
  name: (id) @variable)

(flags_items
  name: (id) @type)

(flags_body
  (id) @variable)

(variant_items
  name: (id) @type)

(variant_case
  name: (id) @constant)

(enum_items
  name: (id) @type)

(enum_case
  name: (id) @constant)

(resource_item
  name: (id) @type)

(resource_method
  (id) @function)

(resource_method
  "constructor" @constructor)

(toplevel_use_item
  "use" @keyword)

(toplevel_use_item
  alias: (id) @module)

(use_item
  "use" @keyword)

(use_path
  (id) @module)

(use_names_item
  (id) @module)

"func" @keyword

[
  "type"
  "interface"
  "world"
  "package"
  "resource"
  "record"
  "enum"
  "flags"
  "variant"
] @keyword

"static" @keyword

[
  "include"
  "import"
  "export"
  "as"
] @keyword

[
  "u8"
  "u16"
  "u32"
  "u64"
  "s8"
  "s16"
  "s32"
  "s64"
  "f32"
  "f64"
  "float32" ; deprecated
  "float64" ; deprecated
  "char"
  "bool"
  "string"
  "tuple"
  "list"
  "option"
  "result"
  "borrow"
] @type

[
  "@"
  "_"
] @punctuation

[
  "/"
  ";"
  ":"
  ","
  "."
  "->"
] @punctuation

[
  "{"
  "}"
  "("
  ")"
  ">"
  "<"
] @punctuation

"=" @operator
